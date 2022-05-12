# Merchant's Guide to the Galaxy 

This is my solution to the Merchant's Code challenge, described in the button of the document. It is build into a web App using React.
Have fun in your intergalactic quests, fellow cosmonaut!

## How to start

You can visit _____ to immediately begging translating your notes.
Alternative, you can choose to clone the repository to your local computer and then do the usual: In a terminal, navigate inside the project's containing folder and run:   


    > npm install   
    
    > npm start   
    

The first command installs dependencies and the second runs the project using a node server. Which reminds me: You need node.js (https://nodejs.org/en/download/) to launch successfully! 

## How to use

Type your notes into the text area, click translate, and mind the following...

- You can either type a single note or several notes at once by separating different notes with line breaks.
- The order of the notes in a multi-note input is irrelevant.
- In any case, any provided information will be logged into the dictionary for future reference. 


- There are 3 kinds of notes that the translator recognizes. They are and should have the following formats (mind the format!):
    - *Digit-equivalence notes*: "galactic_digit is roman_digit"
    - *Exchange rate note*: "galactic_number RESOURCE is arabic_number credits"
    - *queries*:  "how much is galactic_number ?" or "how many credits is galactic_number resource?".
Above, galactic_digit is a word, roman digit is one and only one of the following letters: {I ,V, X, L, C, D, M},  arabic_number is an Arabic number and RESOURCE is the resource you want to trade.
- The input is case insensitive and multi-spacing typos are tolerated. 

- If you type several overlaping digit-equivalences or resource's values for the same digit or resource, it will be assumed you want to update this quantity, so the last typed value will be stored. For example:   

    glob is I   
    
    glob is V   
    

Will log the value of V for glob in the dictionary. 

These are some examples of valid input formats:

    > glob is I  
    
    > glob    is  i  
    
    > glob is I  
    
      pish is X  
      
      how much is pish glob glob?  
      
    > How much is pish glob glob?  
    
      glob is I  
      
      pish is X  
      
    > glob glob Silver is 34 Credits  
    
      How many credits is glob prok Silver    ?  
      

## What it does

The translator will interpret notes, store valid digit-equivalences, compute and store valid resource exchange-rates, and try to answer any queries using the dictionaries. In that order. 

Only valid queries and invalid input have an output. An appropriate warning message is returned when something goes wrong. Some mistakes that will be recognized are:

    - Unrecognized Note. 
    - Invalid Format: roman digit, galactic number, roman number.
    - Insufficient information in dictionaries to convert / store.

## Tests

Test are written using Jest and React Testing Library, which are included in create react app - projects. To run the tests type in the terminal:
    > npm test -- --coverage
Mind the double "--".

## The Challenge

You decided to give up on earth after the latest financial collapse left 99.99% of the earth's population with 0.01% of the wealth. Luckily, with the scant sum of money that is left in your account, you are able to afford to rent a spaceship, leave earth, and fly all over the galaxy to sell common metals and dirt (which apparently is worth a lot).

Buying and selling over the galaxy requires you to convert numbers and units, and you decided to write a program to help you.

The numbers used for intergalactic transactions follows similar convention to the roman numerals and you have painstakingly collected the appropriate translation between them.

Input to your program consists of lines of text detailing your notes on the conversion between intergalactic units and roman numerals. You are expected to handle invalid queries appropriately.

## A Test input and output

**Input**
glob is I   

prok is V   

pish is X   

tegj is L   

glob glob Silver is 34 Credits   

glob prok Gold is 57800 Credits   

pish pish Iron is 3910 Credits   

how much is pish tegj glob glob ?   

how many Credits is glob prok Silver ?   

how many Credits is glob prok Gold ?   

how many Credits is glob prok Iron ?   

how much wood could a woodchuck chuck if a woodchuck could chuck wood ?   


**Test Output**
pish tegj glob glob is 42   

glob prok Silver is 68 Credits   

glob prok Gold is 57800 Credits   

glob prok Iron is 782 Credits   

I have no idea what you are talking about   
