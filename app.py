from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/founder')
def founder():
    return render_template('founder.html')

@app.route('/products')
def products():
    return render_template('products.html')

@app.route('/news')
def news():
    return render_template('news.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True) 