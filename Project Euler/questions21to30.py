import math
import json
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
        if i == d(d(i)):
            if d(i) != 1 and i != d(i):
                print(i, d(i))
                s+= i
    print(s)
#Answer: 31626

#Question 22: Find the total of scores of the names in names.txt
def question22():
    #Put names into a usable array
    names = json.loads("[" + open("names.txt", "r").read() + "]")
    names.sort()
    def score(word, position):
        d = 0
        for letter in word:
            d += " ABCDEFGHIJKLMNOPQRSTUVWXYZ".index(letter)
        return d * position
    s = 0
    for i in range(len(names)):
        s += score(names[i], i+1)
    print(s)
#Answer: 871198282

#Question 23: Find the sum of all positive integers which cannot be written as the sum of two abundant numbers
def question23():
    def isntAbundant(n):
        d = 1
        for i in range(2,math.ceil(math.sqrt(n))):
            if(n % i == 0):
                d += i + (n/i)
        return d <= n
    #Generate a list of abundant numbers
    nonabundantNumbers = []
    for i in range(12, 28123): #28123 is largest number that's the usm of two abundant numbers
        if isAbundant(i):
            abundantNumbers.append(i)

    
    print(s)

#A shorthand way so I can quickly swap trials
questionNumber = 23
exec("question{qn}()".format(qn=questionNumber))
