import React, { Component, PropTypes } from 'react';
import styles from './FriendList.css';
import FriendListItem from './FriendListItem';

class FriendList extends Component {
  constructor(){
    super();
    this.state ={
      recordsPerPage:2,
      startIndex: 0,
      endIndex :2,
    }
  }
  getList(e){
    let pageNo = +e.target.getAttribute('data-page-no');
    let state = {...this.state};

    state.startIndex = (pageNo * state.recordsPerPage) -state.recordsPerPage;
    state.endIndex = pageNo *state.recordsPerPage;
    this.setState(state);
  }
  render () {
    const totalRecords = this.props.friends.length;
    const totalPages = Math.round(totalRecords/this.state.recordsPerPage);
    const arrPages = [];
    if(this.state.recordsPerPage < totalRecords){
      for(let i=1; i<=totalPages; i++){
        arrPages.push(<a  key={i} data-page-no={i} onClick={this.getList.bind(this)}>{i}</a>)
       }
    }

    return (
      <ul className={styles.friendList}>
        {
          this.props.friends.slice( this.state.startIndex, this.state.endIndex).map((friend, index) => {
            return (
              <FriendListItem
                key={index}
                id={index}
                name={friend.name}
                starred={friend.starred}
                gender={friend.gender}
                {...this.props.actions} />
            );
          })
        }
        {arrPages}
      </ul>
    );
  }

}

FriendList.propTypes = {
  friends: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

export default FriendList;
