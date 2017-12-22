import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: 16,
  margin: `0 0 8px 0`,
  background: isDragging ? '#DDD' : '#f7f8fb',
  ...draggableStyle,
});

class Card extends Component {
  state = {
    editing: false,
    content: this.props.item.content
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      content: nextProps.item.content
    });
  }
  deleteItem = () => {
    const { item } = this.props;
    this.props.deleteCard(item.id);
  }
  editItem = () => {
    const { item } = this.props;
    const { content } = this.state;
    if (!content.trim()) {
      return;
    }
    this.props.editCard(item.id, content);
    this.showEditForm();
  }
  showEditForm = () => {
    this.setState({
      editing: !this.state.editing
    });
  }
  changeHandler = (e) => {
    this.setState({
      content: e.target.value
    });
  }
  render() {
    const { item } = this.props;
    const { editing, content } = this.state;
    return(
      <Draggable key={item.id} draggableId={item.id}>
        {(provided, snapshot) => (
          <div className="card">
            <div
              ref={provided.innerRef}
              style={getItemStyle(
                provided.draggableStyle,
                snapshot.isDragging
              )}
              {...provided.dragHandleProps}
            >
              {
                editing ?
                <div className='card__form'>
                  <textarea autoFocus onChange={this.changeHandler} value={content}/>
                  <button onClick={this.editItem}>Save</button>
                </div> :
                <div>
                  <p style={{ wordWrap: 'break-word' }}>{content}</p>
                  <i className="edit-btn fa fa-pencil-square-o" aria-hidden="true" onClick={this.showEditForm}></i>
                  <i className="delete-btn fa fa-trash-o" onClick={this.deleteItem}
                  aria-hidden="true"></i>
                </div>
              }
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
