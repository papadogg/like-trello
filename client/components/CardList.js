import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';

import Card from './Card';

const getListStyle = isDraggingOver => ({
  background: isDraggingOver && 'lightblue',
});

class CardList extends Component {
  state = {
    content: '',
    show: false
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
      content: '',
      show: false
    });
  }
  showAddForm = () => {
    this.setState({
      content: '',
      show: !this.state.show
    }, () => {
      this.scrollToBottom();
    });
  }
  scrollToBottom = () => {
    const {col} = this.refs;
    if(col) {
      col.scrollTop = col.scrollHeight - col.clientHeight;
    }
  }
  render() {
    const { items, listId, deleteCard, editCard } = this.props;
    const { content, show } = this.state;
    return(
      <div ref="col" style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '80vh' }}>
        <Droppable droppableId={listId}>
          {(provided, snapshot) => (
            <div
              className='card-list'
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              <h4 className="card-list__title">{listId}</h4>
              {items.map(item => <Card
                 key={item.id}
                 item={item}
                 deleteCard={deleteCard}
                 editCard={editCard}
                 listId={listId} />)}
              {provided.placeholder}
              {show ? <form className="card-list__form" onSubmit={this.addCard}>
                <textarea autoFocus value={content} onChange={this.changeHandler} />
                <div className="card-list__form-footer">
                  <button type="submit">Add</button>
                  <i className="card-list__close-form-btn fa fa-times" aria-hidden="true" onClick={this.showAddForm}></i>
                </div>
              </form> : <button className="card-list__button--add-card" onClick={this.showAddForm}>Add a card...</button>}
            </div>
          )}
        </Droppable>
      </div>
    );
  }
}

export default CardList;
