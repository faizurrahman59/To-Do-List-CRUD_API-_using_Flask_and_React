from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, Item

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)
db.init_app(app)


@app.route('/')
def home():
    return "✅ Flask backend is running!"





with app.app_context():
    db.create_all()

@app.route('/items', methods=['GET'])
def get_items():
    items = Item.query.all()
    return jsonify([item.to_dict() for item in items])

@app.route('/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_item = Item(name=data['name'], description=data.get('description', ''))
    db.session.add(new_item)
    db.session.commit()
    return jsonify(new_item.to_dict()), 201

@app.route('/items/<int:item_id>', methods=['DELETE'])
def delete_item(item_id):
    item = Item.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return jsonify({'message': 'Deleted'})




@app.route('/items/<int:item_id>', methods=['PUT'])
def update_item(item_id):
    item = Item.query.get_or_404(item_id)
    data = request.get_json()

    item.name = data.get('name', item.name)
    item.description = data.get('description', item.description)

    db.session.commit()
    return jsonify(item.to_dict())



if __name__ == '__main__':
    app.run(debug=True)
 
