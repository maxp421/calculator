# Calculator

[The Odin Project](https://www.theodinproject.com/lessons/foundations-calculator) Calculator app built with JS, HTML, CSS  
[Live preview 👌]()

This project diverts from The Odin Project assignment, instead of evaluating pairs of expressions
I decided to evaluate an entire string of inputs at once, allowing the use of paranthesis and exponentiation. According to my research this could be done using `eval()` with a filtered
input relatively safely as this project is running clientside. Another solution could be using a `new Function()` to evaluate a string but security wise the risks would be the same.  
A better alternative would be using a library such as [mathjs](https://mathjs.org/) which [should](https://mathjs.org/docs/expressions/security.html) be safer.

The solution I chose was to parse the string myself using RegEx as I have been meaning to learn RegEx for a while now and this project seemed like a great excuse to do so.

Order of operations:

1.  Parantheses
2.  Exponentiation
3.  Multiplication and Division
4.  Modulo
5.  Addition and Subtraction
