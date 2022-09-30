# Beispiel-Array
data = [91, 87, -3, 5, 6, 19, 20]

#Ausgabe mit print
print(data)

#Anzahl der Elemente mit len()
print(len(data))

#Zugriff auf Elemente mit dem Index-Operator
print(data[0], data[-1], data[len(data)-1], data[2])

#for Schleife mit Index
for index in range(len(data)):
    print(index, data[index])

#for Schleife mit Enumerate
for index, value in enumerate(data):
    print(index, value)

#for in Schleife
for value in data:
    print(value)

print(data)
#Array Slicing
start = 1
stop = 5
step = 2
print(data[start:stop:step])

#Beispiele
print(data[3:]) #alle Elemente ab Index 3 (incl)
print(data[3:-1])
print(data[:])
print(data[-1:3:-1]) #kehr Reihenfolge um für die Indizes 4...6