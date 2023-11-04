function myFunction() {
  // Get input values
  var num1 = parseFloat(document.getElementById("numerator1").value);
  var dum1 = parseFloat(document.getElementById("denominator1").value);
  var num2 = parseFloat(document.getElementById("numerator2").value);
  var dum2 = parseFloat(document.getElementById("denominator2").value);
  var op = document.getElementById("operation").value;

  var sign = "";
  if (op == 'add') {
      sign = "+";
  } else if (op == 'subtract') {
      sign = "-";
  } else if (op == 'multiply') {
      sign = "*";
  } else if (op == 'divide') {
      sign = "/";
  }

  var st1 = "Step 1: (" + num1 + "/" + dum1 + ")" + sign + "(" + num2 + "/" + dum2 + ")";

  if (op == 'add') {
      var st2 = "Step 2: (" + num1 + "*" + dum2 + "+" + num2 + "*" + dum1 + ")" + "/" + "(" + dum1 * dum2 + ")";
  } else if (op == 'subtract') {
      var st2 = "Step 2: (" + num1 + "*" + dum2 + "-" + num2 + "*" + dum1 + ")" + "/" + "(" + dum1 * dum2 + ")";
  } else if (op == 'multiply') {
      var st2 = "Step 2: (" + num1 + "*" + num2 + ")" + "/" + "(" + dum1 + "*" + dum2 + ")";
  } else if (op == 'divide') {
      var st2 = "Step 2: (" + num1 + "*" + dum2 + ")" + "/" + "(" + num2 + "*" + dum1 + ")";
  }

  var result = calculate_fraction(op, num1, num2, den1, den2)

  document.getElementById("step1").textContent = st1;
  document.getElementById("step2").textContent = st2;
  document.getElementById("res").textContent = result;

}

  function simplifyFraction(numerator, denominator) {
      function gcd(a, b) {
          return b === 0 ? a : gcd(b, a % b);
      }

      var gcdValue = gcd(numerator, denominator);

      var simplifiedNumerator = numerator / gcdValue;
      var simplifiedDenominator = denominator / gcdValue;

      return [simplifiedNumerator, simplifiedDenominator];
  }

  function calculateFraction(operation, num1, num2, den1, den2) {
      if (operation === 'add') {
          var resultNum = (num1 * den2) + (num2 * den1);
          var resultDen = den1 * den2;
          var simplifiedResult = simplifyFraction(resultNum, resultDen);
          resultNum = simplifiedResult[0];
          resultDen = simplifiedResult[1];
      } else if (operation === 'subtract') {
          var resultNum = (num1 * den2) - (num2 * den1);
          var resultDen = den1 * den2;
          var simplifiedResult = simplifyFraction(resultNum, resultDen);
          resultNum = simplifiedResult[0];
          resultDen = simplifiedResult[1];
      } else if (operation === 'multiply') {
          var resultNum = num1 * num2;
          var resultDen = den1 * den2;
          var simplifiedResult = simplifyFraction(resultNum, resultDen);
          resultNum = simplifiedResult[0];
          resultDen = simplifiedResult[1];
          if (resultDen < 0) {
              resultNum = -resultNum;
              resultDen = Math.abs(resultDen);
          }
      } else if (operation === 'divide') {
          if (num2 === 0) {
              return "Error: Division by zero";
          }
          var resultNum = num1 * den2;
          var resultDen = den1 * num2;
          var simplifiedResult = simplifyFraction(resultNum, resultDen);
          resultNum = simplifiedResult[0];
          resultDen = simplifiedResult[1];
          if (resultDen < 0) {
              resultNum = -resultNum;
              resultDen = Math.abs(resultDen);
          }
      } else {
          return "Invalid operation";
      }

      return resultNum + '/' + resultDen;
  }
