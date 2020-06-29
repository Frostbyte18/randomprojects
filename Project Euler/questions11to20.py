import math
from pprint import pprint

#Question 11: Find the greatest product of four adjacent numbers in the 20x20 grid
def question11():
    grid = [[8,2,22,97,38,15,0,40,0,75,4,5,7,78,52,12,50,77,91,8],[49,49,99,40,17,81,18,57,60,87,17,40,98,43,69,48,4,56,62,0],[81,49,31,73,55,79,14,29,93,71,40,67,53,88,30,3,49,13,36,65],[52,70,95,23,4,60,11,42,69,24,68,56,1,32,56,71,37,2,36,91],[22,31,16,71,51,67,63,89,41,92,36,54,22,40,40,28,66,33,13,80],[24,47,32,60,99,3,45,2,44,75,33,53,78,36,84,20,35,17,12,50],[32,98,81,28,64,23,67,10,26,38,40,67,59,54,70,66,18,38,64,70],[67,26,20,68,2,62,12,20,95,63,94,39,63,8,40,91,66,49,94,21],[24,55,58,5,66,73,99,26,97,17,78,78,96,83,14,88,34,89,63,72],[21,36,23,9,75,00,76,44,20,45,35,14,0,61,33,97,34,31,33,95],[78,17,53,28,22,75,31,67,15,94,3,80,4,62,16,14,9,53,56,92],[16,39,5,42,96,35,31,47,55,58,88,24,0,17,54,24,36,29,85,57],[86,56,0,48,35,71,89,7,5,44,44,37,44,60,21,58,51,54,17,58],[19,80,81,68,5,94,47,69,28,73,92,13,86,52,17,77,4,89,55,40],[4,52,8,83,97,35,99,16,7,97,57,32,16,26,26,79,33,27,98,66],[88,36,68,87,57,62,20,72,3,46,33,67,46,55,12,32,63,93,53,69],[4,42,16,73,38,25,39,11,24,94,72,18,8,46,29,32,40,62,76,36],[20,69,36,41,72,30,23,88,34,62,99,69,82,67,59,85,74,4,36,16],[20,73,35,29,78,31,90,1,74,31,49,71,48,86,81,16,23,57,5,54],[1,70,54,71,83,51,54,69,16,92,33,48,61,43,52,1,89,19,67,48]]
    size = len(grid)

    def product1(x, y, prod):
        #horizontal product
        if(x + 4 <= size ):
            if(grid[x][y] * grid[x + 1][y] * grid[x + 2][y] * grid[x + 3][y] > prod):
                return grid[x][y] * grid[x + 1][y] * grid[x + 2][y] * grid[x + 3][y]
        return prod

    def product2(x, y, prod):
        #upper diagonal product
        if(x + 4 <= size and y + 4 <= 0):
            if(grid[x][y] * grid[x + 1][y + 1] * grid[x + 2][y + 2] * grid[x + 3][y + 3] > prod):
                return grid[x][y] * grid[x + 1][y + 1] * grid[x + 2][y + 2] * grid[x + 3][y + 3]
        return prod

    def product3(x, y, prod):
        #lower diagonal product
        if(x + 4 <= size and y - 4 <= size):
            if(grid[x][y] * grid[x + 1][y - 1] * grid[x + 2][y - 2] * grid[x + 3][y - 3] > prod):
                return grid[x][y] * grid[x + 1][y - 1] * grid[x + 2][y - 2] * grid[x + 3][y - 3]
        return prod

    product = 0
    for x in range(0,size):
        for y in range(0,size):
            product = product1(x, y, product)
            product = product2(x, y, product)
            product = product3(x, y, product)
    print(product)
#Answer: 70600674

#Question 12: What is the value of the first triangle number to have over 500 divisiors
def question12():
    def numDivisors(n):
        r = 0
        for i in range(1, math.floor(math.sqrt(n)) + 1):
            if(n % i == 0):
                r += 2 if math.sqrt(n) != i else 1
        return r

    triangleRound = 1
    triangleNumber = 1
    while(numDivisors(triangleNumber) < 500):
        triangleRound += 1
        triangleNumber += triangleRound
    print(triangleNumber)
#Answer: 76576500

#Question 13: What are the first 10 digits of the sum of the following digits
def question13():
    numberString = "37107287533902102798797998220837590246510135740250463769376774900097126481248969700780504170182605387432498619952474105947423330951305812372661730962991942213363574161572522430563301811072406154908250230675882075393461711719803104210475137780632466768926167069662363382013637841838368417873436172675728112879812849979408065481931592621691275889832738442742289174325203219235894228767964876702721893184745144573600130643909116721685684458871160315327670386486105843025439939619828917593665686757934951621764571418565606295021572231965867550793241933316490635246274190492910143244581382266334794475817892575867718337217661963751590579239728245598838407582035653253593990084026335689488301894586282278288018119938482628201427819413994056758715117009439035398664372827112653829987240784473053190104293586865155060062958648615320752733719591914205172558297169388870771546649911559348760353292171497005693854370070576826684624621495650076471787294438377604532826541087568284431911906346940378552177792951453612327252500029607107508256381565671088525835072145876576172410976447339110607218265236877223636045174237069058518606604482076212098132878607339694128114266041808683061932846081119106155694051268969251934325451728388641918047049293215058642563049483624672216484350762017279180399446930047329563406911573244438690812579451408905770622942919710792820955037687525678773091862540744969844508330393682126183363848253301546861961243487676812975343759465158038628759287849020152168555482871720121925776695478182833757993103614740356856449095527097864797581167263201004368978425535399209318374414978068609844840309812907779179908821879532736447567559084803087086987551392711854517078544161852424320693150332599594068957565367821070749269665376763262354472106979395067965269474259770973916669376304263398708541052684708299085211399427365734116182760315001271653786073615010808570091499395125570281987460043753582903531743471732693212357815498262974255273730794953759765105305946966067683156574377167401875275889028025717332296191766687138199318110487701902712526768027607800301367868099252546340106163286652636270218540497705585629946580636237993140746255962240744869082311749777923654662572469233228109171419143028819710328859780666976089293863828502533340334413065578016127815921815005561868836468420090470230530811728164304876237919698424872550366387845831148769693215490281042402013833512446218144177347063783299490636259666498587618221225225512486764533677201869716985443124195724099139590089523100588229554825530026352078153229679624948164195386821877476085327132285723110424803456124867697064507995236377742425354112916842768655389262050249103265729672370191327572567528565324825826546309220705859652229798860272258331913126375147341994889534765745501184957014548792889848568277260777137214037988797153829820378303147352772158034814451349137322665138134829543829199918180278916522431027392251122869539409579530664052326325380441000596549391598795936352974615218550237130764225512118369380358038858490341698116222072977186158236678424689157993532961922624679571944012690438771072750481023908955235974572318970677254791506150550495392297953090112996751986188088225875314529584099251203829009407770775672113067397083047244838165338735023408456470580773088295917476714036319800818712901187549131054712658197623331044818386269515456334926366572897563400500428462801835170705278318394258821455212272512503275512160354698120058176216521282765275169129689778932238195734329339946437501907836945765883352399886755061649651847751807381688378610915273579297013376217784275219262340194239963916804498399317331273132924185707147349566916674687634660915035914677504995186714302352196288948901024233251169136196266227326746080059154747183079839286853520694694454072476841822524674417161514036427982273348055556214818971426179103425986472045168939894221798260880768528778364618279934631376775430780936333301898264209010848802521674670883215120185883543223812876952786713296124747824645386369930090493103636197638780396218407357239979422340623539380833965132740801111666627891981488087797941876876144230030984490851411606618262936828367647447792391803351109890697907148578694408955299065364044742557608365997664579509666024396409905389607120198219976047599490197230297649139826800329731560371200413779037855660850892521673093931987275027546890690370753941304265231501194809377245048795150954100921645863754710598436791786391670211874924319957006419179697775990283006991536871371193661495281130587638027841075444973307840789923115535562561142322423255033685442488917353448899115014406480203690680639606723221932041495354150312888033953605329934036800697771065056663195481234880673210146739058568557934581403627822703280826165707739483275922328459417065250945123252306082291880205877731971983945018088807242966198081119777158542502016545090413245809786882778948721859617721078384350691861554356628840622574736922845095162084960398013400172393067166682355524525280460972253503534226472524250874054075591789781264330331690"
    numberList = list(numberString)
    fdNumbers = [] #Fifty digit numbers
    tempNumber = ""
    for short in numberString: #Split long string into 100 digit numbers
        tempNumber += short
        if len(tempNumber) == 50:
            fdNumbers.append(tempNumber)
            tempNumber = ""
    total = 0
    tdNumbers = [] #Ten digit numbers
    for short in fdNumbers:
        total += int(short)

    print(str(total)[0:10])
#Answer: 5537376230

#Question 14: Find the longest Collatz chain starting with a term under 1 million
def question14():
    def next(n):
        if(math.floor(n/2) == n/2): #is even
            return n/2
        else:
            return (3 * n) + 1
    def score(pN):
        score = 1
        while pN != 1:
            score += 1
            pN = next(pN)
        return score

    highScore = 0
    highNumber = 0
    for i in range(1,1000000):
        if(score(i) > highScore):
            highNumber = i
            highScore = score(i)
    print(highNumber, highScore)
#Answer: 837799 (With a chain of 525)

#Question 15: How many ways can you navigate through a 20x20 square maze
def question15():
    #routesFrom() was my first try, and while I'm pretty sure it will return the correct answer,
    #it takes way too long to run
    def routesFrom(x, y):
        r = 0
        #If not the edge, note a possible movement
        #Then find out how many movements can be made through that future spot
        if x != 1:
            r += routesFrom(x-1, y)
        if y != 1:
            r += routesFrom(x, y-1)
        if x == 1 and y == 1:
            r = 1
        return r

    def maxRoutes(lX, lY):
        routeMatrix = [[1]]
        def get(x, y):
            if x < 0 or y < 0:
                return 0
            else:
                #Gets number of routes to a certain point, creates point if it doens't exist yet
                if(len(routeMatrix) < y+1):
                    for i in range(y- len(routeMatrix)+1):
                        routeMatrix.append([])
                if(len(routeMatrix[y]) < x+1):
                    for i in range(x - len(routeMatrix[y])+1):
                        routeMatrix[y].append(0)
                return routeMatrix[y][x]

        #Cycle through all points, and set the value of each point to the number of possible ways to get to adjacent poitns
        for y in range((lY+1)):
            for x in range((lX+1)):
                get(x, y)
                routeMatrix[y][x] += get(x-1, y) + get(x, y-1)

        return get(lX, lY)

    print(maxRoutes(20,20))
#Answer: 137846528820

#What is the sum of the digits of 2^1000
def question16():
    l = str(2**1000)
    t = 0
    for n in l:
        t += int(n)
    print(t)
#Answer: 1366

def question17():
    def numberToWord(n):
        n = int(n) #Able to easily pass strings as a parameter
        ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"]
        tens = ["twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"]
        if n < 20:
            return ones[n]
        elif n < 100: #20-99
            return tens[int(str(n)[0])-2] + numberToWord(str(n)[1])
        elif n < 1000: #100-999
            end = numberToWord(str(n)[1:])
            if end == "":
                return ones[int(str(n)[0])] + "hundred"
            else:
                return ones[int(str(n)[0])] + "hundredand" + end
        else: #one thousand
            return "onethousand"

    t = 0
    for i in range(1001):
        t+= len(numberToWord(i))
    print(t)
#Answer: 21124

#Find the highest sum path of the given pyramid
def question18():
    #Unsorted nodes
    nodes = ("75 95 64 17 47 82 18 35 87 10 20 04 82 47 65 19 01 23 75 03 34 88 02 77 73 07 63 67 99 65 04 28 06 16 70 92 41 41 26 56 83 40 80 70 33 41 48 72 33 47 32 37 16 94 29 53 71 44 65 25 43 91 52 97 51 14 70 11 33 28 77 73 17 78 39 68 17 57 91 71 52 38 17 14 91 43 58 50 27 29 48 63 66 04 68 89 53 67 30 73 16 69 87 40 31 04 62 98 27 23 09 70 98 73 93 38 53 60 04 23").split()
    rows = 15
    triangle = [[]]
    p = 1 #Number of nodes in current setup layer
    #Setting up the pyramid
    for node in nodes:
        if(len(triangle[p-1]) == p):
            triangle.append([int(node)])
            p+=1
        else:
            triangle[p-1].append(int(node))

    #note to self: node n in layer l corresponds to nodes n and n+1 in layer l+1
    tempLayer = []
    previousLayer = triangle[0]
    for iLayer in range(1,len(triangle)):
        for iNode in range(len(triangle[iLayer])):
            if iNode == 0: #No choice in node, moust add first node of previous layer
                #Equivalent of setting l+1's n to l's n
                tempLayer.append(triangle[iLayer][iNode] + previousLayer[iNode])
            elif iNode == iLayer: #Again, no choice in node, must add last node of previous
                #Equivalent of setting l+1's n to l's n+1
                tempLayer.append(triangle[iLayer][iNode] + previousLayer[iNode-1])
            else: #Need to check which leads to a higher sum
                higherPrevNode = previousLayer[iNode] if previousLayer[iNode] > previousLayer[iNode - 1] else previousLayer[iNode - 1]
                tempLayer.append(triangle[iLayer][iNode] + higherPrevNode)

        previousLayer = tempLayer
        tempLayer = []
    #Check for highest
    h = 0
    for n in previousLayer:
        if n > h: h = n
    print(h)
#Answer: 1074

#Question 19: How many sundays fell on the first of the month during the twentieth
def question19():
    #Days are 0...6 -> monday...sunday
    day = 1
    date = [1, 1, 1900] #[dd,mm,yyyy]
    total = 0
    while date != [31, 12, 2000]:
        #Check
        if date[0] == 1 and day == 7 and date[2] >= 1901:
            total += 1
        #Step day
        day = day + 1 if day < 7 else 1
        date[0] += 1

        #Check to see if month has gone too far
        if (date[0] > 31 and date[1] in [1,3,5,7,8,10,12]) or (date[0] > 30 and date[1] in [4,6,9,11]):
            if date[1] == 12:
                date[1] = 1
                date[2] += 1
            else: #month is december
                date[1] += 1
            date[0] = 1
        elif date[1] == 2: #month is february
            if (date[2]/4 == int(date[2]/4)) and date[0] > 29:
                date[0] = 1
                date[1] += 1
            elif (date[2]/4 != int(date[2]/4)) and date[0] > 28:
                date[0] = 1
                date[1] += 1

    print(total)
#Answer: 171

#Question 20: Find the sum of the digits in 100!
def question20():
    def factorial(n):
        d = 1
        for i in range(1, n+1):
            d *= i
        return d
    d = 0
    for n in str(factorial(100)):
        d += int(n)
    print(d)
#Answer: 648
#note to self, congrats on doing this problem in under a minute

#A shorthand way so I can quickly swap trials
questionNumber = 20
exec("question{qn}()".format(qn=questionNumber))
