from abc import abstractmethod, ABCMeta


class Pipeline(metaclass=ABCMeta):

    @abstractmethod
    def run(self):
        pass
