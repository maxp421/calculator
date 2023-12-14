// afterwards call function that will parse input into elements consisting of
// either number, operator, or expression in paranthesis, store them in an array
// then look for a paranthesis expression in the array and recursivelly call the
// same function on it
//
// validate starter string?, same as validate expressions with minor differences
// i.e. expression can start with paranthesis.
// validate parenthesis
// 1. Look for most nested parentheses
// 2. store string index and contents of parentheses
// 3. check if expression is valid, if no return error message as result
//                                  if yes call a function that will parse it into
// numbers(floating point, don't forget the dot) and operators and store
// those in an array in original order
// 4. Look for operators descending from highest precedence to lowest, when
// an operator is found, take elements[0](num), elements[1](operator), elements[2](num)
// and evaluate them, store result.
// 5. Replace the 3 of them with the result, shifting the array
// to remove gaps. (potentially a better performance option with some other
// algorithm but order is important in this one);
// 6. After entire expression is evaluated, replace paranthesis in string with result.
// 7.
