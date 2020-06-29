#Given a list of points and have to figure out how many rectangles can be found
from random import randint
import math

#Define parameters for the set of numbers
setSize = 40
setDimension = 10
search = "square"
#Might need to write a function to check validity of parameters

#Create an empty array to keep points in
points = []

def generatePoint(setDimension):
  return [randint(-setDimension,setDimension), randint(-setDimension,setDimension)]

#Populate the array
i = 0
while i < setSize:
  proposedPoint = generatePoint(setDimension)
  #Making sure point isn't already inside the list
  if(proposedPoint not in points):
    points.append(proposedPoint)
    i += 1

#Temporary testing set 
points = [[5,5],[5,0],[5,-5],[0,5],[0,0],[0,-5],[-5,5],[-5,0],[-5,-5]]

#Finds the ditance between two points using algebraic distance formula
def distance(p1, p2):
  return math.sqrt((p2[0]-p1[0])**2 + (p2[1]-p1[1])**2)

#Takes endpoints of two line segments and returns whether they are the same length
def areEqualSegments(line1p1, line1p2, line2p1, line2p2):
  return distance(line1p1, line1p2) == distance(line2p1, line2p2)

answer = 0

def checkCriteria(mode, p1, p2, p3, p4):
  if mode == "rectangle" and areEqualSegments(p1,p2,p3,p4) and areEqualSegments(p1,p4,p2,p3) and areEqualSegments(p1,p3,p2,p4):
      return 1
  elif mode == "square" and areEqualSegments(p1,p2,p2,p3)and areEqualSegments(p2,p3,p3,p4)  and areEqualSegments(p3,p4,p1,p4) and areEqualSegments(p1,p3,p2,p4):
      return 1
  else:
    return 0

#Check each point against every other points
for p1 in points:
  for p2 in points[points.index(p1)+1:]:
    for p3 in points[points.index(p2)+1:]:
      for p4 in points[points.index(p3)+1:]:
        answer += checkCriteria(search, p1, p2, p3, p4)

print(answer)
