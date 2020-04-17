import math


#Question 1: Find the sum of all multiples of 3 or 5 below 1000
def question1():
    possibleNumbers = range(1,1000)
    finalNumber = 0
    for num in possibleNumbers:
        if(num % 5 == 0 or num % 3 == 0):
            finalNumber += num
    print(finalNumber)
#Answer: 233168

#Question 2: find the even sum of fibonnaci values below 4,000,000
def question2():
    #Generate fibonnaci sequence, and if it's even add it to the sum
    fibonacci = [1,2]
    evenSum = 2
    while(fibonacci[-1]  + fibonacci[-2] < 4000000):
        fibonacci.append(fibonacci[-1] + fibonacci[-2])
        if(fibonacci[-1] % 2 == 0):
            evenSum += fibonacci[len(fibonacci) - 1]
    print(evenSum)
#Answer: 4613732

#Question 3: what is the largest prime factor of 600851475143
def question3():
    #Make an is prime function
    def firstFactor(n):
        for i in range(2, math.floor(math.sqrt(n))):
            if(n % i == 0):
                return i
        return -1

    number = 600851475143
    aNumber = number
    while True:
        if(firstFactor(aNumber) == -1):
            #number is prime
            print(aNumber)
            break
        else:
            aNumber = aNumber / firstFactor(aNumber)
#Answer: 6857

#Question 4: Find the largest palindrome made up from the product of two 3-digit numbers
def question4():
    def isPalindrome(n):
        intStr = list(str(n))
        for i in range(0, math.floor(len(intStr)/2)):
            if(intStr[i] != intStr[0-i-1]):
                return False
        return True

    n = [1000, 999]
    cycle = 1
    subcycle = 0
    while True:
        subcycle = 0
        n[0] = 999 - cycle
        n[1] = 999

        while subcycle != cycle:
            if(isPalindrome(n[0] * n[1]) and n[0] > 99 and n[1] > 99):
                break
            else:
                n[0] += 1
                n[1] -= 1
                subcycle += 1
        if(isPalindrome(n[0] * n[1]) and n[0] > 99 and n[1] > 99):
            print(n[0], n[1], n[0]*n[1])
            break
        else:
            cycle += 1
#Answer: 913 * 993 = 906609

#Question 5: What is the smallest  positive evenly divisible by all of the numbers from 1 to 20
def question5():
    def firstFactor(n):
        for i in range(2, math.ceil(n/2)+1):
            if(n % i == 0):
                return i
        return -1

    necessaryFactors = []

    def factorize(n):
        n = int(n)
        f = firstFactor(n)
        if(f == -1): #n is prime
            return [n]
        else:
            return factorize(f) + factorize(n/f)

    for i in range(1, 100):
        nFactors = factorize(i)
        for f in nFactors:
            if(necessaryFactors.count(f) < nFactors.count(f)):
                for j in range(0, nFactors.count(f) - necessaryFactors.count(f)):
                    necessaryFactors.append(f)

    finalProduct = 1
    for i in necessaryFactors:
        finalProduct = finalProduct * i
    print(finalProduct)
#Answer: 232792560

#Question 6: Find the difference between the sum of the squares of the first 100 natural numbers and the square of the sum
def question6():
    firstNumbers = 100
    sumOfSquares = 0
    for i in range(1, firstNumbers + 1):
        sumOfSquares += ( i ** 2 )
        print(i, i ** 2, sumOfSquares)
    squareOfSum = ((firstNumbers + 1) * firstNumbers / 2) ** 2
    print(sumOfSquares)
    print(sumOfSquares - squareOfSum)
#Answer: 25164150

#Question 7: What is the 10,001st prime number
def question7():
    def isPrime(n):
        for i in range(2, math.ceil(n/2)+1):
            if(n % i == 0):
                return False
        return True

    stopNumber = 10001
    prime = 0
    n = 2
    while True:
        if(isPrime(n)):
            prime += 1
        if(prime == stopNumber):
            print(n)
            break
        n += 1
#Answer: 104743

#Question 8: Find highest product of thirteen adjacent numbers in the 1000-digit number
def question8():
    longNumber = 7316717653133062491922511967442657474235534919493496983520312774506326239578318016984801869478851843858615607891129494954595017379583319528532088055111254069874715852386305071569329096329522744304355766896648950445244523161731856403098711121722383113622298934233803081353362766142828064444866452387493035890729629049156044077239071381051585930796086670172427121883998797908792274921901699720888093776657273330010533678812202354218097512545405947522435258490771167055601360483958644670632441572215539753697817977846174064955149290862569321978468622482839722413756570560574902614079729686524145351004748216637048440319989000889524345065854122758866688116427171479924442928230863465674813919123162824586178664583591245665294765456828489128831426076900422421902267105562632111110937054421750694165896040807198403850962455444362981230987879927244284909188845801561660979191338754992005240636899125607176060588611646710940507754100225698315520005593572972571636269561882670428252483600823257530420752963450

    numberListStr = list(str(longNumber))
    numberList = []
    for element in numberListStr:
        numberList.append(int(element))

    def product13(index):
        retProduct = 1
        for i in range(0, 13):
            retProduct = retProduct * numberList[index + i]
        return retProduct

    highest = 1
    for i in range(0, len(numberList) - 13):
        l = product13(i)
        if l > highest:
            highest = l
    print(highest)
#Answer 23514624000

#Question 9: What pythagorean triplet sums to 1000
def question9():
    n = [1,1]
    step = 1
    substep = 0
    while True:
        n[0] = step
        n[1] = 1
        while(n[0] != 0):
            #print(n[0], n[1], math.sqrt((n[0] ** 2) + (n[1] ** 2)))
            if(n[0] + n[1] + math.sqrt((n[0] ** 2) + (n[1] ** 2)) == 1000):
                #print("broken from within inner loop")
                #print(n[0], n[1], math.sqrt((n[0] ** 2) + (n[1] ** 2)))
                break
            else:
                n[0] -= 1
                n[1] += 1

        if(n[0] + n[1] + math.sqrt((n[0] ** 2) + (n[1] ** 2)) == 1000 and n[0] != 0):
            print(n[0] * n[1] * math.sqrt((n[0] ** 2) + (n[1] ** 2)))
            break
        else:
            step += 1
#Answer: 31875000

#Question 10: Find the sum of the primes less than 2,000,000
def question10():
    def isPrime(n):
        for i in range(2, math.ceil(math.sqrt(n))+1):
            if(n % i == 0):
                return False
        return True

    sum = 5
    for i in range(4, 2000000):
        if(isPrime(i)):
            sum += i
    print(sum)
#Answer: 142913828922

questionNumber = 10
exec("question{qn}()".format(qn=questionNumber))
