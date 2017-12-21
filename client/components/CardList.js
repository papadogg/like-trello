import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from './Card';

const grid = 8;
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250,
  minHeight: 25
});

class CardList extends Component {
  state = {
    content: ''
  }
  changeHandler = (e) => {
    this.setState({
      content: e.target.value
    });
  }
  addCard = (e) => {
    e.preventDefault();
    const { content } = this.state;
    if (!content.trim()) {
      return;
    }
    const order = this.props.items.length;
    this.props.addCard({content, order}, this.props.listId);
    this.setState({
      content: ''
    });
  }
  render() {
    const { items, listId, deleteCard, editCard } = this.props;
    return(
      <div>
        <h4>{listId}</h4>
        <div style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '80vh' }}>
          <Droppable droppableId={listId}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot.isDraggingOver)}
              >
                {items.map(item => <Card
                   key={item.id}
                   item={item}
                   deleteCard={deleteCard}
                   editCard={editCard}
                   listId={listId} />)}
                {provided.placeholder}
                <form onSubmit={this.addCard}>
                  <textarea value={this.state.content} onChange={this.changeHandler} />
                  <button>Add</button>
                </form>
              </div>
            )}
          </Droppable>
        </div>
      </div>
    );
  }
}

export default CardList;
