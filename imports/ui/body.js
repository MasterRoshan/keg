import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker'
import { Template } from 'meteor/templating';

import { Temperatures } from '../api/temperatures.js';

import './body.html';

import Chart from 'chart.js';

Template.body.helpers({
  temperatures() {
    return Temperatures.find({});
  },
});

Template.body.onRendered(function(){
  this.autorun(function(){
  data = []
  labels = []
  Temperatures.find({},{'sort': {'created_at': -1}, 'limit': 8}).forEach(function(obj){
    data.unshift({'x': obj.created_at, 'y': obj.temp})
    labels.push(obj.created_at.getHours() + ':' + obj.created_at.getMinutes())
  })
  var config = {
    type: 'line',
    data: {
      labels: labels,
      //labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: data,
        fill: false,
      }]},
    options: {
      animation: {
          duration: 0 // general animation time
      },
      hover: {
        animationDuration: 0 // duration of animations when hovering an item
      },
      responsiveAnimationDuration: 0,
      responsive: true,
      title: {
        display: true,
        text: 'Chart.js Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Time'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  }
  if(this.myChart){
    this.myChart.destroy()
  }
  this.myChart = new Chart(document.getElementById('myChart'), config)
})
})
