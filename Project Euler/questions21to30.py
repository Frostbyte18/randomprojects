import math
from pprint import pprint

#Question 21: Find the sum of all the amicable numbers under 10000
def question21():
    def d(n): #Return sum of divisors
        d = 1
        for i in range(2, math.ceil(math.sqrt(n))+1):
            if(n % i == 0):
                d += i + (n/i)
        return int(d)
    s=0
    for i in range(0, 10000):
        if i == d(d(i)) and d(i) != 1:
            print(i, d(i))
            s+= i
    print(s)

#A shorthand way so I can quickly swap trials
questionNumber = 21
exec("question{qn}()".format(qn=questionNumber))
