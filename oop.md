# Objektorientierte Programmierung anhand von chessjs


1. Klasse - Instanz - Objekt

Zur besseren Verwaltung gleichartiger Objekte bedienen sich die meisten Programmiersprachen des Konzeptes der Klasse.
Klassen sind vorlagen, aus denen Instanzen genannte Objte zur Laufzeit erzeugt werden. Im prgramm werden nicht einzelne Objekte, sonder eine Klasse gleichartiger Objekte definiert. Existieren in der gewählten Programmiersprache keine Klassen oder werden die expoizit unterdrückt, so spricht man zur Unterscheidung of auch von objektbasiert Programmierung

Man kann sich die Erzeugung von Objekten aus einer Klasse vorstellen wie das Fertigen von Autos aus dem Kotnrouktionsplan eines bestimmen Farhzeugtyps. Klassen sind die Kontrunktionsplöne für Objekte.

Die Klasse entspricht in etwa einem komplexen Datentyp wie inder prozedualen Programminerung, geht aber darüber hinaus: Sie legt nicht nur die Datentypen fest, aus denen die mit Hilfe der Klassen erzeugten Objekte bestehen, sie definiert zudem die Algorithmen, die auf diesen Daten operieren. Während also zur Laufzeit eines Programms einzelne Objekte miteinander interagieren, wird das Grundmuster dieser Interaktion durch die Definition der einzelnen Klassen festgelegt.

Beispiel 1:
Die Klasse "Auto" legt fest, dass das Auto vier Reifen, fünf Türen, einen Motor und fünf Sitze hat.
Das Objekt "Automodell1" hat schließlich vier Reifen mit einem Durchmesser 60cm und der BReite 20cm, fünf rote Türen, einen Motor mit 150kW und fünf Ledersitze.
Ein weiteres Objekt "Automodell2" hat vier Reifen mti dem Durchmesser 40cm und der Breite 15cm, fünf blaue Türen....
Beide Objekte sind unterschiedliche geöhren aber zu der gemeinsamen Klasse Auto.

Beispiel chessts:

Klasse `ChessPiece` legt fest, welche Figuren es gibt, wie viele Schritte jede machen darf etc.

2. Kapselung

Als Datenkapselung bezeichnet man in der Programmierung das Verbergen von IMplementierungsdetails. Auf die interne Datenstruktur kann nicht direkt zugegriffen werden, sondern nur über definierte Schnittstellen. Objekte können den internen Zustand anderer Objekte nicht in unerwarteter Weise lesen oder ändern. Ein Objekt hat eine Schnittstelle, die darüber bestimmt, auf welche Weise mit dem Objekt interagiert werden kann. Dies verhindert das Umgehen von Invariaten des Programms.


3. Kohäsion

Kohäsion beschreibt, wie gut eine Programmeinheit eine logische Aufgabe oder Einheit abbildet. In einem System mit starker Kohösion ist jede Programmeineheit/Methode, verantwortlich für genau eine wohldefinierte Aufgabe oder einheit.
DRY - Dont Repeat Yourself


4. Botschaften

Eine Botschaft (Message) ist ein Auftrag oder eine Anfrage eines Objektes an ein anderes Objekt eine Dienstleistung zu erbringung
- zb Client -> Server.SetFarbe(rot) -> Server - SetFarbe(f)


5. Vererbung

Vererbung heißt vereinfacht, dass eine abgeletitete Klasse die Methoden und Attribute der Basisklasse ebenfalls besitzt, also "erbt". Somit kann die abgeleitete Klasse auch darauf zugreifen. Neue Arten von Objekten können auf der Basis bereits vorhandener Objektdefinitionen festgelegt werden. Es können neue Bestandteile hinzugnommen werden oder vorhandene Überlagert werden.


6. Polymorphie

Unter bestimmten Vorraussetzungen können Algorithmen, die auf den Schnittstellen eines bestimmten Objekttyps operieren, auch mit davon abgeletiteten Objekten zusammenarbeiten.
Geschieht dies so, dass durch Vererbung überschriebene Methoden an stelle der Methoden des vererbenden Objektes ausgeführt werden, dann spricht man von Polymorphie. Polymorphie stellt damit eine Möglichkeit dar, einer durch ähnliche Objekte ausgeführte Aktion einen Namen zu geben, wobei jedes OBjekt die Aktion in einer für das Objekt geeigneten Weise implementiert.
Diese Technik, das so genannte Overriding, implementiert aber keine universelle Polymorphie, sonder nur die sogenannte Ad-hoc-Polymorphie.


7. Überladen

Man kann eine Familie von Funktionen mit gleichen Namen, aber unterschiedlichen Signaturen definieren. Anhand der Aktualparameter eines Aufrus wird vom Compiler die passende Funktion ausgewählt. EIne spezielle Version heißt Instanz der überladenen Funktion.
- ergibt Sinn wenn mehrere Funktionen ähnliche Dinge tun. Beispielsweise könnte man eine FUnktion implementieren, die das Maximum zweir Integer-Werte ermittelt.
 -- INSERT CODE
- Man muss achtgeben, eine FUnktion nicht versehentlich zu überladen: Deklarationen, die sich in einem Parametertyp wie int und long unterschiden, deklarieren verscihedene Funktionen, auch wenn int und long auf der jeweiligen Maschine identisch sein sollten.
- Mit void test(int); und void test(const int); deklariert man allerdings dieselbe FUnktion. Die Angabe const ist eine Information +ber das Verhalten der Funktion, nicht über Ihre Signatur.
- Außerdem sind Funktionen mit POinter- und Array Parametern identisch: void func(doule \*p und void func (double p[32]);
- Für Verwirrung kann man sorgen, wenn man eine Funktion mit einem int- und einem POinter-Typen überlädt.


8. Überschreiben

Der Begriff Überschreiben (override) beschreibt das ableiten einer Klasse, welche eine eigene Implementierung einer von der Basisklasse geerbten Methode zu definieren.
Überschreiben von Methoden ist ein zetraler BEstandteil der Polymorphie in der Objektorientierung. Das Überschreiben ist zu unterschieden vom Überladen.
Beim Überschreiben ersetzt die überschreibende Methode der abgeleiteten Klasse die überschiriebene Methode der Basisklasse. Die überschreibende Methode kann jedoch auch die überschriebene Methode aufrufen - ansonsten sind die überschriebenen Methoden über die überschreibende Klasse nicht mehr erreichbar.
Damit die ANgabe einer Methode als Überschreiben benzeichnet werden kann, müssen einige Bedingungen erüllt sein. Die wichtigsten Bedingungen lauten:
- Die Methoden m+ssen im Typ ihrer Parameter und in der Länge der Parameterliste exakt übereinstimmen.
- Der Rückgabewert der Methode muss denselben Typ oder einen Subtyp dieses Typs haben dieses Typs haben wie der Rückgabewert der überschriebenen Methode (Kovarianz)
- Die überschreibene Methode darf durch Zugriffsmodifokatoren nicht mehr in den Zugriffsrechten ebschränkt sein als die überschriebene Methode. Der Zuriff darf jedoch weniger restriktiv sein.
- Es können nur Instanzmethoden überschrieben werden, keien Klassenmethoden (statische Methoden).
- Eine Methode gilt nur als überschrieben, wenn sie auch tatsächlich geerbt wurde. Methoden gleichen Namens und mit identischer Signatur, die aber aufgrund von Zugriffsrechten nicht geerbt wurden, gelten nicht als überschrieben. 

