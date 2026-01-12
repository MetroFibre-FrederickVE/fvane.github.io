from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    info = {
        'name': 'Totally real name',
        'bio': 'Software Engineer specializing in .NET Core and scalable codebases.',
        'skills': ['Python', 'Flask', 'Docker', 'SQL', 'AWS'],  # Customize
        'projects': [
            {'name': 'Project1', 'desc': 'A microservice for data processing.'},
            # Add more
        ]
    }
    return render_template('index.html', info=info)

if __name__ == '__main__':
    app.run(debug=True)  # For development; use a production server later