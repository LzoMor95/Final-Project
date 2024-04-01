import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [file, setFile] = useState(null);
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [privateMessages, setPrivateMessages] = useState([]);

  useEffect(() => {
    fetchUser();
    setPosts();
    setFriendRequests();
    setFriends();
    setPrivateMessages();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/user');
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };


  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts'); 
      setPosts(response.data); 
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get('/api/friendRequests'); 
      setFriendRequests(response.data); 
    } catch (error) {
      console.error('Error fetching friend requests:', error);
    }
  };

  const fetchFriends = async () => {
    try {
      const response = await axios.get('/api/friends'); 
      setFriends(response.data); 
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  const fetchPrivateMessages = async () => {
    try {
      const response = await axios.get('/api/privateMessages'); 
      setPrivateMessages(response.data); 
    } catch (error) {
      console.error('Error fetching private messages:', error);
    }
  };
  
  const handlePostSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('content', newPost);
      formData.append('file', file);
      await axios.post('/api/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPosts();
      setNewPost('');
      setFile(null);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="App">
      {}
    </div>
  );
}

export default App;
