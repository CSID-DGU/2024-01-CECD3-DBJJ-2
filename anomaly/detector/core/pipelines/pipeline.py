from abc import abstractmethod, ABCMeta


class Pipeline(metaclass=ABCMeta):
    @abstractmethod
    def get_instance(self):
        pass

    @abstractmethod
    def run(self):
        pass
