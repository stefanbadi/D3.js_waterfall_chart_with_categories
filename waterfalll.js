//Variable containing the data. This structure can be changed to a csv method served from a webserver
var waterfall_data = [
    {
    "Year": "2013",
    "Direction": "start",
    "State": "EOY 2012",
    "Category1": 10,
    "Category2": 20,
    "Category3": 30,
    "Category4": 10,
    "Category5": 20,
    "Category6": 30,
    "Category7": 40,
    "Category8": 20
  }
  ,
    {
    "Year": "2013",
    "Direction": "in1",
    "State": "New devices",
    "Category1": 20,
    "Category2": 20,
    "Category3": 40,
    "Category4": 60,
    "Category5": 30,
    "Category6": 20,
    "Category7": 10,
    "Category8": 70
  }
  ,
{   "Year": "2013",
    "Direction": "in2",
    "State": "Used devices",
    "Category1": 10,
    "Category2": 20,
    "Category3": 30,
    "Category4": 10,
    "Category5": 80,
    "Category6": 10,
    "Category7": 20,
    "Category8": 30
  }
    ,
{
    "Year": "2013",
    "Direction": "out2",
    "State": "Sold devices",
    "Category1": 10,
    "Category2": 20,
    "Category3": 20,
    "Category4": 10,
    "Category5": 30,
    "Category6": 60,
    "Category7": 10,
    "Category8": 20
  }
    ,
{
    "Year": "2013",
    "Direction": "out1",
    "State": "Broken devices",
    "Category1": 10,
    "Category2": 40,
    "Category3": 40,
    "Category4": 10,
    "Category5": 40,
    "Category6": 0,
    "Category7": 10,
    "Category8": 80
  }
 ,


  {
  "Year": "2014",
  "Direction": "start",
    "State": "EOY 2013",
    "Category1": 20,
    "Category2": 0,
    "Category3": 40,
    "Category4": 60,
    "Category5": 60,
    "Category6": 0,
    "Category7": 50,
    "Category8": 20
  }
   ,
 {
 "Year": "2014",
 "Direction": "in1",
    "State": "New devices",
    "Category1": 20,
    "Category2": 20,
    "Category3": 40,
    "Category4": 60,
    "Category5": 30,
    "Category6": 20,
    "Category7": 10,
    "Category8": 70
  }
  ,
{       "Year": "2014",
    "Direction": "in2",
    "State": "Used devices",
    "Category1": 10,
    "Category2": 20,
    "Category3": 30,
    "Category4": 10,
    "Category5": 80,
    "Category6": 10,
    "Category7": 20,
    "Category8": 30
  }
    ,
{
"Year": "2014",
"Direction": "out2",
    "State": "Sold devices",
    "Category1": 10,
    "Category2": 20,
    "Category3": 20,
    "Category4": 10,
    "Category5": 30,
    "Category6": 10,
    "Category7": 10,
    "Category8": 20
  }
    ,
{
"Year": "2014",
"Direction": "out1",
    "State": "Broken devices",
    "Category1": 10,
    "Category2": 10,
    "Category3": 40,
    "Category4": 10,
    "Category5": 40,
    "Category6": 0,
    "Category7": 10,
    "Category8": 80
  }
  ,
    {
    "Year": "2015",
    "Direction": "start",
    "State": "EOY 2014",
    "Category1": 30,
    "Category2": 10,
    "Category3": 50,
    "Category4": 110,
    "Category5": 100,
    "Category6": 20,
    "Category7": 60,
    "Category8": 20
  }
  ]
;



  //formatt data and set vars
  var formatted_data = format_data(waterfall_data);

  waterfall_data = formatted_data[0];
  var max_y = formatted_data[1];
  var categories = formatted_data[2];

  //set margin and width/height
  var margin = {top: 20, right: 110, bottom: 80, left: 60},
      width = 1060 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;


 //draw svg
 var svg = d3.select("body").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)
             .append("g")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

 //define xvscale and the rect_width
 var x_scale = d3.scaleBand()
                 .range([0, width])
                 .domain(d3.set(waterfall_data,function(d) { return d.state + ":" + d.year; }).values());

 var rect_width = (width/x_scale.domain().length)-5;

 //define y scale
 var y_scale = d3.scaleLinear()
                 .range([height-20, 0])
                 .domain([0, max_y]);

 //and finally opacity scale
 var opacity = d3.scaleOrdinal()
                 .range([0.9, 0.8, 0.7, 0.6, 0.5,0.4,0.3,0.2])
                 .domain(categories);

 //draw Y axis
 var yAxis = d3.axisLeft()
               .scale(y_scale)
               .tickFormat(function(d){
                  var my_format = d3.format(".2s");
                  if(d>0){return my_format(d)}
                })
               .tickSizeOuter(0);

  svg.append("g")
     .attr("class","axis")
     .attr("transform", "translate(-10,0)")
     .call(yAxis);

  //add axis label
  svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("x",-4)
     .attr("y", 6)
     .style("text-anchor", "end")
     .text("Population");

   //draw Y axis
   var xAxis = d3.axisBottom()
                 .scale(x_scale)
                 .tickFormat(function(d){
                    var my_stack = d.split(":")[0]
                    return my_stack;
                  })
                 .tickSizeOuter(0);

    svg.append("g")
       .attr("class","axis")
       .attr("transform", "translate(0," + height + ")")
       .call(xAxis);

   //define tooltip
   var tooltip = d3.select("body")
                   .append("div")
                   .attr("class", "tooltip_standard")
                   .text("");

  //define rect group
  var rects = svg.selectAll(".rect")
      .data(waterfall_data)
      .enter().append("g")
      .attr("class", "waterfall_bar");

  rects.append("rect")
       .attr("id",function(d){return d.category})
       .attr("width", rect_width)
       .attr("x", function(d) {  return x_scale(d.state + ":" + d.year)})
       .attr("y", function(d) {return y_scale(d.position) - y_scale(max_y - d.value)})
       .attr("height", function(d) {return y_scale(max_y - d.value) })
       .style("fill", function(d) { return d.fill_color})
       .style("opacity", function(d) {return opacity(d.category) })
       .on("mouseover",function(d){
          //change opacity of other rects with this category and legend text + rects
          d3.selectAll("#" + this.id).style("opacity",1)
          d3.selectAll("#text_" + this.id).style("font-weight","bold");
          d3.selectAll("#rect_" + this.id).style("stroke-width",2);
          //position, visibility and text in tooltip
          tooltip.style("visibility","visible");
          tooltip.style("top",event.pageY + "px").style("left",event.pageX + "px");
          tooltip.html("Category: " + d.category + "<br>Value: " + d.value);
        })
        .on("mouseout",function(d){
          //reverse of the above
          tooltip.style("visibility","hidden");
          d3.selectAll("#" + this.id).style("opacity",opacity(this.id));
          d3.selectAll("#rect_" + this.id).style("stroke-width",0);
          d3.selectAll("#text_" + this.id).style("font-weight","");
        })
        .on("click",function(d){
          //add your event here..
          //use d to access the variables
        });

    //draw legend
    var legend = svg.selectAll(".legend")
                    .data(opacity.domain().slice())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function(d, i) { return "translate(0," + (i * 20) + ")"; });

    //blue rects and title
    legend.append("rect")
          .attr("x", width+50)
          .attr("id",function(d){return "rect_" + d})
          .attr("width", 15)
          .attr("height", 15)
          .style("fill", "blue")
          .style("stroke", "black")
          .style("stroke-width",0)
          .style("opacity",opacity);

    svg.append("text")
        .attr("x", width +57.5)
        .attr("y", -5)
        .attr("text-anchor","middle")
        .text("EOY");

    //green rects and title
    legend.append("rect")
        .attr("x", width +70)
        .attr("id",function(d){return "rect_" + d})
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "green")
        .style("stroke", "black")
        .style("stroke-width",0)
        .style("opacity",opacity);

    svg.append("text")
        .attr("x", width + 77.5)
        .attr("y", -5)
        .attr("text-anchor","middle")
        .text("IN");

    //red rects and title
    legend.append("rect")
        .attr("x", width +90)
        .attr("id",function(d){return "rect_" + d})
        .attr("width", 15)
        .attr("height", 15)
        .style("fill", "red")
        .style("stroke", "black")
        .style("stroke-width",0)
        .style("opacity",opacity);

    svg.append("text")
        .attr("x", width +97.5)
        .attr("y", -5)
        .attr("text-anchor","middle")
        .text("OUT");

    //category labels
    legend.append("text")
        .attr("x", width+45)
        .attr("id",function(d){return "text_" + d})
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) { return d; });



function format_data(data){
  var my_list = [], stack_keys=[],max_y=0,current_year="";

  //define years set
  var years =  d3.set(data.map(function (d) {
                          return d.Year
                     })).values();

  //and categories set
  var categories =  Object.keys(data[0]).filter(function(d){return d.substr(0,3) == "Cat"})

  //loop through years
  for(y in years){
    //if there is more than one entry for that year (ie not first EOY) add up and down stacks
    if (data.filter(function(d){return d.Year == years[y]}).length > 2){
      if(current_year !== ""){
        //if there are stacks for the previous year
        my_list = my_list.filter(function(d){ if(d.stack == current_year + "_down" && d.x_pos == "2"){
          //filter out the last EOY stack for the previous year so not repeated
        }else{return d}})
      }
      //add up and now stacks for this year
      my_list = my_list.concat(add_stacks(data,years[y],categories));
      //check max_y
      max_y = check_max(years[y] + "_up",max_y);
      max_y = check_max(years[y] + "_down",max_y);
      current_year = years[y];
    };
  };

  function check_max(max_str,max_y){
    //return current max_y - for y_scale
    var current_max = d3.sum(my_list,function(d){if(d.stack == max_str){return d.value}});
    if(current_max > max_y){
      return current_max;
    } else {
      return max_y;
    };
  };

  return [my_list,max_y,categories];

};

function add_stacks(data,year,categories){

  var count = 0, y_pos = 0,stack_list=[],stack_vals = [],start_year="";

    //start with stacks up
    var direction_list = ["start","in1","in2"];

    for(d in direction_list){
      stack_vals = add_to_stack(data,year,year,"up",direction_list[d],categories,count,d,y_pos);
      stack_list = stack_list.concat(stack_vals[0]);
      count = stack_vals[1];
      y_pos = stack_vals[2];
    };
    //reverse categories list and repeat with stacks down
    categories.reverse();
    var direction_list = ["out2","out1","start"];
    for(d in direction_list){
      start_year = year;
      if(direction_list[d] == "start"){
        //making sure you add a year for the last EOY column
        start_year = (+year)+1;
      }
      stack_vals = add_to_stack(data,start_year,year,"down",direction_list[d],categories,count,d,y_pos);
      stack_list = stack_list.concat(stack_vals[0]);
      count = stack_vals[1];
      y_pos = stack_vals[2];
    };
    //reverse categories back again
    categories.reverse();

return stack_list;

};

function add_to_stack(data,year,stack_year,direction,query_direction,categories,count,x_pos,y_pos){

  var new_list = [],current_data = {};
  var fill_colors = {start:"blue",in1:"green",in2:"green",out1:"red",out2:"red"};

  current_data = data.filter(function(d){return d.Year == year && d.Direction == query_direction});
  for(c in categories){
    //for each category, add row of data.
    if(direction == "down") {
      //for down the y_pos needs to be subtracted first
      y_pos -= current_data[0][categories[c]];
    }
    new_list.push({
      stack: stack_year+"_"+direction,
      increment: count,
      category: categories[c],
      value: current_data[0][categories[c]],
      position: y_pos,
      state: current_data[0].State,
      year: year,
      fill_color: fill_colors[query_direction],
      x_pos: x_pos
    });
    if(direction == "up"){
      //for up the y pos needs to be added later
      y_pos += current_data[0][categories[c]];
    }
    count += 1;
  };
  return [new_list,count,y_pos];
}
