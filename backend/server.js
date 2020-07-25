const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const tasksRoutes = express.Router();
const PORT = 4000;

let Tasks = require('./tasklist.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/tasklist',{useNewUrlParser: true});
const connection = mongoose.connection;

connection.once('open', function(){
	console.log("MongoDB database connection established successfully");
})

tasksRoutes.route('/').get(function(req, res){
	Tasks.find(function(err, tasks){
		if(err){
			console.log(err);
		}else{
			res.json(tasks);
		}
	});
});

tasksRoutes.route('/:id').get(function(req, res){
	let id = req.params.id;
    Tasks.findById(id, function(err, task) {
        res.json(task);
    });
});

tasksRoutes.route('/update/:id').post(function(req, res) {
    Tasks.findById(req.params.id, function(err, task) {
        if (!task)
            res.status(404).send("data is not found");
        else{
            task.task_name = req.body.task_name;
            task.task_created_date = req.body.task_created_date;
            task.task_end_date = req.body.task_end_date;
            task.save().then(task => {
                res.json('Task updated!');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

tasksRoutes.route('/archive/:id').post(function(req, res){
	Tasks.findById(req.params.id, function(err, task){
		if(!task)
			res.status(404).send("data is not found");
		else{
			task.archiveStatus = true;
			task.save().then(task => {
                res.json('Task Archived!');
            })
            .catch(err => {
                res.status(400).send("Archive not possible");
            });
		}
	});
});

tasksRoutes.route('/add').post(function(req, res){
	let tasks = new Tasks(req.body);
	tasks.save()
		.then(tasks => {
			res.status(200).json({'Task': 'Task added successfully'});
		})
		.catch(err => {
			res.status(400).send('Adding new Tasks failed');
		});
});

app.use('/tasklist', tasksRoutes);

app.listen(PORT, function(){
	console.log("Server is running on Port: " + PORT);
});
