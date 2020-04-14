import turtle
import random
import math
import time

#Setup the boundary
populationSpace = 400 #Size of space
populationRadius = populationSpace / 2
textCoordinates = {"census-data" : [-200,-224], "census-label" : [-200,-214], "time" : [-200, 200]}

#Setup population functions and stuff
communityCenterNum = 12 #Number of centers
population = [] #Holds all of person objects
communityCenters = [] #Hold all of community center objejcts
communityPopularityContest = []
states = ["healthy", "infected", "dead", "cured", "carrier"]
steadyState = [200, 15, 0, 0, 0] #sets up number of people in each category
populationSize = len(steadyState) #Number of people
timeState = 0

#POPULATION TEST VARIABLES
pLeavehouse = 0.05 #Chance they'll leave house
pInfectionChance = 0.5 #chance someone within range is infected
pFatalityChance = 0.015 #chance someone with corona dies on a round
pInfectionTime = 45
pCarrierTime = 20
pInfectionRange = 6 #Distance in which you can be infected
pTimeOut = 5 #Number of cycles they stay at a social center
pMaxDistanceFromHome = 25

##TURTLE STUFF------------
#Setup turtle
wdw = turtle.Screen()
wdw.bgcolor("light blue")
wdw.title("COVID-19")
turt = turtle.Turtle()
turtle.tracer(0,0)
turt.speed("fastest")
turt.hideturtle()

#Custom goto function that doesn't draw
def cgoto(x,y):
    turt.penup()
    turt.goto(x,y)
    turt.pendown()

#Custom square function
def drawSquare(radius, x, y):
    cgoto(x - radius,y - radius)
    turt.pendown()
    len = radius * 2
    turt.goto(turt.xcor() + len, turt.ycor())
    turt.goto(turt.xcor(), turt.ycor() + len)
    turt.goto(turt.xcor() - len, turt.ycor())
    turt.goto(turt.xcor(), turt.ycor() - len)
    turt.penup()

def drawCircle(radius, x, y):
    cgoto(x, y)
    turt.pendown()
    turt.begin_fill()
    turt.circle(radius)
    turt.penup()
    turt.end_fill()

def drawDot(size, x, y):
    cgoto(x, y)
    turt.dot(size)

def cText(header, text):
    cgoto(textCoordinates[header][0], textCoordinates[header][1])
    turt.pendown()
    turt.write(text)
    turt.penup()

#CLASS DEFINTIONS------------
class person:
    def __init__(self):
        self.homeX = random.randint(0-populationSpace, populationSpace)/2
        self.homeY = random.randint(0-populationSpace, populationSpace)/2
        self.state = states[0]
        self.X = self.homeX
        self.Y = self.homeY
        self.leftHome = 0
        if(self.state == states[1]): #Infected
            self.timeInfected = pCarrierTime + math.randint(0,pInfectionTime)
        elif(self.state == states[3]): #Carrier
            self.timeInfected = math.randint(0, pCarrierTime)
        else:
            self.timeInfected = 0

class communityCenter:
    def __init__(self):
        self.X = random.randint(0-populationSpace, populationSpace)/2
        self.Y = random.randint(0-populationSpace, populationSpace)/2
        self.popularity = random.randint(1,10)

##OTHER FUNCTIONS------------
def testProbability(odds):
    #Odds should be a decimal percentage,8 up to 3 decimal places (i.e. 0.XYZ = XY.Z%)
    if(random.randint(1,100*1000) <= odds*100*1000):
        return True
    else:
        return False

def distance(x1, y1, x2, y2):
    return math.sqrt((x2-x1)**2 + (y2-y1)**2)

def peopleDistance(person1, person2):
    return distance(person1.X, person1.Y, person2.X, person2.Y)

def populate():
    for state in states:
        for people in range(0,steadyState[states.index(state)]):
            population.append(person())
            population[len(population)-1].state = state
            #print(state)

def genCommunityCenters():
    #Create community centers
    for i in range(0, communityCenterNum):
        communityCenters.append(communityCenter())
        #Add their popularity contest bids
        for l in range(0,communityCenters[i].popularity):
            communityPopularityContest.append(i)

def checkValidCoordinates(coordinateArray):
    if(math.fabs(coordinateArray[0]) <= populationRadius and math.fabs(coordinateArray[1]) <= populationRadius):

        return True
    else:
        return False

def migrate():
    for person in population:
        if(person.state != states[2]):
            foundSpot = False
            leaving = testProbability(pLeavehouse)
            while(foundSpot != True):
                newCoordinates = [0, 0]
                newDistance = random.randint(0,pMaxDistanceFromHome)
                newAngle = math.radians(random.randint(0,360))

                if(person.leftHome == 0):
                    #They're currently home
                    if(leaving):
                        #They decided to go to a social center
                        destination = random.randint(0,len(communityCenters)-1)
                        newCoordinates = [communityCenters[destination].X + (math.cos(newAngle) * newDistance), communityCenters[destination].Y + (math.sin(newAngle) * newDistance)]
                        if(checkValidCoordinates(newCoordinates)):
                            foundSpot = True
                            person.leftHome += 1
                    else:
                        #They're staying close to home
                        newCoordinates = [person.X + (math.cos(newAngle) * newDistance), person.Y + (math.sin(newAngle) * newDistance)]
                        #Only approved if not too far from home
                        if(checkValidCoordinates(newCoordinates) and math.dist(newCoordinates, [person.homeX, person.homeY]) <= pMaxDistanceFromHome):
                            foundSpot = True
                            #print("dist:{dst}".format(dst=newDistance))
                else:
                    #They're out currently
                    if(person.leftHome == pTimeOut):
                        #They're coming home now
                        newCoordinates = [person.homeX + (math.cos(newAngle) * newDistance), person.homeY + (math.sin(newAngle) * newDistance)]
                        #Only approved if not too far from home
                        if(checkValidCoordinates(newCoordinates) and math.dist(newCoordinates, [person.homeX, person.homeY]) <= pMaxDistanceFromHome):
                            foundSpot = True
                    else:
                        #They're staying out
                        newCoordinates = [person.X + (math.cos(newAngle) * newDistance), person.Y + (math.sin(newAngle) * newDistance)]
                        #Only approved if not too far from home
                        if(checkValidCoordinates(newCoordinates)):
                            person.leftHome += 1
                            foundSpot = True
            person.X = newCoordinates[0]
            person.Y = newCoordinates[1]

def spread():
    for person in population:
        if(person.state == states[0]): #Healthy
            time.sleep(0)
        if(person.state == states[1]): #Infected
            for otherPerson in population:
                if(person != otherPerson and peopleDistance(person, otherPerson) <= pInfectionRange and otherPerson.state == states[0] and testProbability(pInfectionChance)):
                    #Other person is getting infected
                    otherPerson.state = states[4]
            person.timeInfected += 1

            if(person.timeInfected > pInfectionTime + pCarrierTime):
                #They've been cured
                person.state = states[3]
            elif(testProbability(pFatalityChance)):
                #They died
                person.state = states[2]
        if(person.state == states[4]): #Carrier
            for otherPerson in population:
                if(person != otherPerson and peopleDistance(person, otherPerson) <= pInfectionRange and otherPerson.state == states[0] and testProbability(pInfectionChance)):
                    #Other person is getting infected
                    otherPerson.state = states[4]
            person.timeInfected += 1

            if(person.timeInfected > pCarrierTime):
                #They're officially infected
                person.state = states[1]


def census():
    global steadyState
    #Clear steadyState
    for i in range(0,len(steadyState)):
        steadyState[i] = 0

    for person in population:
        steadyState[states.index(person.state)] += 1

def iterate():
    migrate()
    spread()
    census()
    global timeState
    timeState += 1


def draw():
    turt.clear()

    turt.color("black")
    drawSquare(populationRadius, 0, 2)

    #Draw houses and people
    for person in population:
        turt.color("blue")
        drawDot(6, person.homeX, person.homeY)
        if(person.state == "healthy"):
            turt.color("green")
        elif(person.state == "infected"):
            turt.color("red")
        elif(person.state == "carrier"):
            turt.color("purple")
        elif(person.state == "cured"):
            turt.color("white")
        elif(person.state == "dead"):
            turt.color("black")

        drawDot(4, person.X, person.Y)

    #Draw community centers
    turt.color("orange")
    for center in communityCenters:
        drawDot(9, center.X, center.Y)

    #Write information
    turt.color("black")
    cText("time", "time:{timer_text}".format(timer_text=timeState))
    cText("census-label", "{label}".format(label=states))
    cText("census-data", "{data}".format(data=steadyState))

    turtle.update()

def setup():
    #Make people and community centers
    populate()
    genCommunityCenters()

    #Draw boundary

setup()
draw()

for e in range(1, 401):
    time.sleep(0.0625)
    iterate()
    draw()


#Finish
turtle.exitonclick()
