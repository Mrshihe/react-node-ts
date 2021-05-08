import React from 'react';
import { Button, message } from 'antd';
import {  Redirect } from 'react-router-dom'
import axios from 'axios';
import './style.css'

import HouseList from '../../components/HouseItem'

class Home extends React.Component {
  state = {
    loaded: false,
    isLogin: true,
    houseList: []
  }
  handleLogout = () => {
    axios.get('/api/logout').then(res =>{
      if(res.data?.data){
        this.setState({
          isLogin: false
        })
      }else{
        message.warn('退出失败')
      }
    })
  }
  handleCrowller = () => {
    axios.get('/api/getData').then(res => {
      if(res.data?.data){
        message.success('获取数据成功');
      }else{
        message.warn('获取数据失败');
      }
    })
  }
  handleShowData = () => {
    axios.get('/api/showData').then(res => {
      if(res.data?.data){
        let arr: any[] = [];
        for(const key in res.data.data ){
          arr = arr.concat(res.data.data[key])
        }
        this.setState({
          houseList: arr
        })
      }
    })
  }
  render(){
    const { isLogin, loaded, houseList } = this.state;
    if( isLogin ) {
      if(loaded){
        return (
          <React.Fragment>
            <div className="home-page">
              <Button type="primary" onClick={ this.handleCrowller }>爬取数据</Button>
              <Button type="primary" onClick={ this.handleShowData }>展示数据</Button>
              <Button type="primary" onClick={ this.handleLogout }>退出</Button>
            </div>
            <HouseList houselist={ houseList } />
          </React.Fragment>
        )
      }else{
        return null
      }
    }else{
      return <Redirect to="/login" />
    }
  }
  componentDidMount() {
    axios.get('/api/isLogin').then(res => {
      if(!res.data?.data){
        this.setState({
          isLogin: false,
          loaded: true
        })
      }else{
        this.setState({
          loaded: true
        })
      }
    })
  }
  
}

export default Home;
