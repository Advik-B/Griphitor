var jsonTreeData = [
	{  
	   "id":"1",
	   "name":"Electronics",
	   "text":"Electronics",
	   "parent_id":"0",
	   "children":[  
		  {  
			 "id":"2",
			 "name":"Mobile",
			 "text":"Mobile",
			 "parent_id":"1",
			 "children":[  
				{  
				   "id":"7",
				   "name":"Samsung",
				   "text":"Samsung",
				   "parent_id":"2",
				   "children":[  

				   ],
				   "data":{  

				   },
				   "a_attr":{  
					  "href":"https://www.js-tutorials.com"
				   }
				},
				{  
				   "id":"8",
				   "name":"Apple",
				   "text":"Apple",
				   "parent_id":"2",
				   "children":[  

				   ],
				   "data":{  

				   },
				   "a_attr":{  
					  "href":"https://www.js-tutorials.com"
				   }
				}
			 ],
			 "data":{  

			 },
			 "a_attr":{  
				"href":"https://www.js-tutorials.com"
			 }
		  },
		  {  
			 "id":"3",
			 "name":"Laptop",
			 "text":"Laptop",
			 "parent_id":"1",
			 "state" : {
			   selected  : true,
			   opened : true
			 },
			 "children":[  
				{  
				   "id":"4",
				   "name":"Keyboard",
				   "text":"Keyboard",
				   "parent_id":"3",
				   "children":[  

				   ],
				   "data":{  

				   },
				   "a_attr":{  
					  "href":"https://www.js-tutorials.com"
				   }
				},
				{  
				   "id":"5",
				   "name":"Computer Peripherals",
				   "text":"Computer Peripherals",
				   "parent_id":"3",
				   "state" : {
					   selected  : true,
					   opened : true
					},
				   "children":[  
					  {  
						 "id":"6",
						 "name":"Printers",
						 "text":"Printers",
						 "parent_id":"5",
						 "children":[  

						 ],
						 "data":{  

						 },
						 "a_attr":{  
							"href":"https://www.js-tutorials.com"
						 }
					  },
					  {  
						 "id":"10",
						 "name":"Monitors",
						 "text":"Monitors",
						 "parent_id":"5",
						 "children":[  

						 ],
						 "data":{  

						 },
						 "a_attr":{  
							"href":"https://www.js-tutorials.com"
						 }
					  }
				   ],
				   "data":{  

				   },
				   "a_attr":{  
					  "href":"https://www.js-tutorials.com"
				   }
				},
				{  
				   "id":"11",
				   "name":"Dell",
				   "text":"Dell",
				   "parent_id":"3",
				   "children":[  

				   ],
				   "data":{  

				   },
				   "a_attr":{  
					  "href":"https://www.js-tutorials.com"
				   }
				}
			 ],
			 "data":{  

			 },
			 "a_attr":{  
				"href":"https://www.js-tutorials.com"
			 }
		  }
	   ],
	   "data":{  

	   },
	   "a_attr":{  
		  "href":"https://www.js-tutorials.com"
	   }
	}
  ];
$(function () {
  // 6 create an instance when the DOM is ready
  $('#jstree').jstree();
  // 7 bind to events triggered on the tree
  $('#jstree').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });
  // Test
  $('#jstree').jstree({
		'core' : {
            'data' : jsonTreeData
        },
		"search": {
			"case_insensitive": true,
			"show_only_matches" : true
		},
		plugins: ["search"]
	}).bind("select_node.jstree", function (e, data) {
		 var href = data.node.a_attr.href;
		 var parentId = data.node.a_attr.parent_id;
		 if(href == '#')
		 return '';
		 window.open(href);
	});
	$('#treeview_json').slimScroll({
		height: '200px'
	});
});