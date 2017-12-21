import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',

  // styles we need to apply on draggables
  ...draggableStyle,
});

class Card extends Component {
  state = {
    editing: false,
    content: this.props.item.content
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
          <div>
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
                <div>
                  <textarea rows="4" onChange={this.changeHandler} value={content}/>
                  <button onClick={this.editItem}>Save</button>
                </div> :
                <p style={{ wordWrap: 'break-word' }}>{item.content}</p>
              }
              <button onClick={this.showEditForm}>Edit</button>
              <button onClick={this.deleteItem}>Delete</button>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Draggable>
    );
  }
}

export default Card;
