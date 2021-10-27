import time

def thread_test():
    num = 0
    while True:
        num = num + 1
        print(num)
        time.sleep(2)