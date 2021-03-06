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
  Temperatures.find({},{'sort': {'created_at': -1}}).forEach(function(obj){
    data.unshift({'x': obj.created_at, 'y': obj.temp})
    labels.unshift(obj.created_at.getHours() + ':' + obj.created_at.getMinutes())
  })
  var config = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Temperatures',
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
