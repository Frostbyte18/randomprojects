
"""
#original function
def filterNumber(fb):
    if(fb % 3 == 0):
        return "fizz"
    elif(fb % 5 == 0):
        return "buzz"
    elif(fb % 3 == 0 and fb % 5 == 0):
        return "fizzbuzz"
    else:
        return fb
"""

checks = {3:"fizz", 7:"buzz", 13    :"wee"}
checkNumbers = list(checks)

def filterNumber(fb):
    returnString = ""
    for i in checkNumbers:
        if(fb % i == 0):
            returnString += checks[i]
    if(returnString == ""):
        return fb
    else:
        return returnString

limit = 100 #number of times to run
for i in range(1,limit + 1):
    print(filterNumber(i))
