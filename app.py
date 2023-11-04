from flask import Flask,render_template,request
import math

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template('home.html')

@app.route("/calculator")
def calculator_list():
    return render_template('Calculators/calculator.html')

@app.route("/conversion")
def conversion_list():
    return render_template('Conversions/conversion.html')


def simplify_fraction(numerator, denominator):
  # Find the greatest common divisor (GCD)
  gcd = math.gcd(numerator, denominator)

  # Simplify the fraction by dividing both numerator and denominator by GCD
  simplified_numerator = numerator // gcd
  simplified_denominator = denominator // gcd

  return simplified_numerator, simplified_denominator
  

def calculate_fraction(operation, num1, num2, den1, den2):
  if operation == 'add':
    result_num = (num1 * den2) + (num2 * den1)
    result_den = den1 * den2
    result_num, result_den = simplify_fraction(result_num, result_den)
  elif operation == 'subtract':
    result_num = (num1 * den2) - (num2 * den1)
    result_den = den1 * den2
    result_num, result_den = simplify_fraction(result_num, result_den)
  elif operation == 'multiply':
    result_num = num1 * num2
    result_den = den1 * den2
    result_num, result_den = simplify_fraction(result_num, result_den)
    if (result_den < 0):
      result_num = -result_num
      result_den = abs(result_den)
  elif operation == 'divide':
    if num2 == 0:
        return "Error: Division by zero"
    result_num = num1 * den2
    result_den = den1 * num2
    result_num, result_den = simplify_fraction(result_num, result_den)
    if (result_den < 0):
      result_num = -result_num
      result_den = abs(result_den)
  else:
    return "Invalid operation"

  return f"{result_num}/{result_den}"

@app.route("/calculator/fraction", methods=["GET", "POST"])
def fraction_calculator():
  result = None

  if request.method == "POST":
    operation = request.form.get("operation")
    num1 = int(request.form.get("numerator1"))
    den1 = int(request.form.get("denominator1"))
    num2 = int(request.form.get("numerator2"))
    den2 = int(request.form.get("denominator2"))
    
    result = calculate_fraction(operation, num1, num2, den1, den2)
  
  return render_template('Calculators/fraction.html',result=result)

if __name__ == "__main__":
  app.run(host="0.0.0.0", debug=True)