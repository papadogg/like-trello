import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { withTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';

import { Dashboards } from '../../imports/collections/dashboards';
import CardList from './CardList';

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const reorder2 = (list, element, endIndex) => {
  const result = Array.from(list);
  result.splice(endIndex, 0, element);
  return result;
};

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: [],
      inprogress: [],
      done: [],
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  componentDidMount() {
    if (this.props.dashboard && this.props.dashboard.items) {
      const items = this.props.dashboard.items.sort((a, b) => a.order - b.order)
      this.setState({
        todo: items.filter(item => item.status === 'todo'),
        inprogress: items.filter(item => item.status === 'inprogress'),
        done: items.filter(item => item.status === 'done')
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.dashboard && nextProps.dashboard.items) {
      const items = nextProps.dashboard.items.sort((a, b) => a.order - b.order)
      this.setState({
        todo: items.filter(item => item.status === 'todo'),
        inprogress: items.filter(item => item.status === 'inprogress'),
        done: items.filter(item => item.status === 'done')
      });
    }
  }

  onDragEnd(result) {

    if (!result.destination) {
      return;
    }

    if(result.destination.droppableId === result.source.droppableId) {
      const itemsId = result.source.droppableId;
      const items = reorder(
        this.state[itemsId],
        result.source.index,
        result.destination.index
      );

      this.setState({
        [itemsId]: items
      }, () => {
        this.updateItems();
      });
    } else {
      const sourceId = result.source.droppableId;
      const draggableItem = this.state[sourceId].find(item => item.id === result.draggableId);
      const newSourceList = this.state[sourceId].filter(item => item.id !== result.draggableId);
      const destinationId = result.destination.droppableId;
      draggableItem.status = destinationId;
      const draggableItemModified = {
        ...draggableItem,
        status: destinationId
      }
      const items = reorder2(
        this.state[destinationId],
        draggableItemModified,
        result.destination.index
      );

      this.setState({
        [sourceId]: newSourceList,
        [destinationId]: items
      }, () => {
        this.updateItems();
      });
    }
  }

  addCard = (newItem, listId) => {
    const _id = this.props.match.params.id;
    Meteor.call('dashboard.add_item', newItem, listId, _id);
  }

  deleteCard = (id, items) => {
    const _id = this.props.match.params.id;
    Meteor.call('dashboard.remove_item', id, _id);
  }

  editCard = (id, content) => {
    const _id = this.props.match.params.id;
    Meteor.call('dashboard.edit_item', id, content, _id);
  }

  updateItems = () => {
    const { todo, inprogress, done } = this.state;
    const _id = this.props.match.params.id;
    const items = [
      ...todo.map((item, i) => {
        return { ...item, order: i }
      }),
      ...inprogress.map((item, i) => {
        return { ...item, order: i }
      }),
      ...done.map((item, i) => {
        return { ...item, order: i }
      })
    ];
    Meteor.call('dashboard.update_items', items, _id);
  }

  render() {
    const { dashboard, loading } = this.props;
    return (
      <div>
        {dashboard &&
          <div>
            <Link to='/'>View all dashboards</Link>
            <DragDropContext onDragEnd={this.onDragEnd}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <CardList
                  items={this.state.todo}
                  deleteCard={this.deleteCard}
                  addCard={this.addCard}
                  editCard={this.editCard}
                  listId='todo'
                />
                <CardList
                  items={this.state.inprogress}
                  deleteCard={this.deleteCard}
                  addCard={this.addCard}
                  editCard={this.editCard}
                  listId='inprogress'
                />
                <CardList
                  items={this.state.done}
                  deleteCard={this.deleteCard}
                  addCard={this.addCard}
                  editCard={this.editCard}
                  listId='done'
                />
              </div>
          </DragDropContext>
          </div> }
        { !dashboard && !loading && <div>
          <p>Can not find anything</p>
          <Link to='/'>Go home</Link>
        </div>
        }
        { loading && <div>Loading...</div>}
      </div>
    );
  }
}

export default withTracker(props => {
  const _id = props.match.params.id;
  const handle = Meteor.subscribe('singleDashboard', _id);
  return {
    dashboard: Dashboards.findOne({_id}),
    loading: !handle.ready(),
  }
})(Dashboard);
