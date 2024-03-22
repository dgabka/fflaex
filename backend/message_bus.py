from enum import StrEnum, auto
from typing import Any
from time import time

STALE_MESSAGE_AGE = 60


class Topic(StrEnum):
    LIBRARY_ITEM_UPDATED = auto()
    LIBRARY_ITEM_REMOVED = auto()
    ENCODING_PROGRESS = auto()


class Message:
    topic: Topic
    data: Any
    is_received: bool = False
    timestamp: float

    def __init__(self, topic: Topic, data: Any) -> None:
        self.topic = topic
        self.data = data
        self.timestamp = time()


class Singleton(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instances[cls]


class MessageBus(metaclass=Singleton):
    messages: list[Message] = []

    def publish(self, topic: Topic, data: Any) -> None:
        self.messages.append(Message(topic, data))

    def clear_stale(self) -> None:
        timestamp = time()
        self.messages = list(
            filter(
                lambda msg: (timestamp - msg.timestamp) < STALE_MESSAGE_AGE
                and msg.is_received == False,
                self.messages,
            )
        )

    def has_messages(self) -> bool:
        self.clear_stale()
        return self.messages.__len__() > 0

    def get_message(self):
        self.clear_stale()
        for msg in self.messages:
            msg.is_received = True
            return {"topic": msg.topic, "data": msg.data}


message_bus = MessageBus()
