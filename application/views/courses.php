
<div id="navigation">
                <table>
                <tr>
                	<td width="72%">
                    <ul>
                    <li  style="position: relative; ">
	                    	<a href="home" style="position: relative; ">Home</a>
                    </li>
                    <li id="pg873600280878711087" style="position: relative; ">
                    	<a href="about" style="position: relative; ">About</a>
                    </li>
                    <li id="pg849208609319064705" style="position: relative; ">
                    	<a href="projects" style="position: relative; ">Projects</a>
                    </li>
                    <li id="pg289405349604947483" style="position: relative; ">
                    	<a href="publications1" style="position: relative; ">Publications</a>
                    </li>
                    <li id="active" style="position: relative; ">
                    	<a href="courses" style="position: relative; ">Courses</a>
                    </li>
                    <li id="pg513741096409430388" style="position: relative; ">
                    	<a href="people" style="position: relative; ">People</a>
                    </li>
                    <li id="pg328664862367688996" style="position: relative; ">
                    	<a href="news" style="position: relative; ">News</a>
                    </li>
                    <li id="pg667435914845654009" style="position: relative; ">
                    	<a href="activities" style="position: relative; ">Activities</a>
                    </li>
                  	</ul>
                
                </td>
                <td width="17%">
                
                	<div class="fb-like" data-href="https://www.facebook.com/pages/CNeRG/122322841226800" data-send="true" data-layout="button_count" data-width="50" data-show-faces="true"></div>
                	
                	</td>
                	<td width="11%">
                	<a href="https://twitter.com/CNeRGIITKgp" class="twitter-follow-button" data-show-count="false" data-show-screen-name="false">Follow @CNeRGIITKgp</a>
<script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
						</td>
                	</tr>
                	
                </table>
               </div>

                <div id="content">
                    <div id='wsite-content' class='wsite-not-footer'>
<div class='wsite-not-footer'>

<?php foreach($courses as $course): ?>
<div><div class="wsite-multicol"><div style="padding-right:1.2%"><div class="wsite-multicol-table-wrap" style="margin:0 -5px"><table class="wsite-multicol-table"><tbody class="wsite-multicol-tbody"><tr class="wsite-multicol-tr"><td class="wsite-multicol-col" style="width:100%;padding:0 5px"><div><div class="wsite-multicol"><div style="padding-right:1.2%"><div class="wsite-multicol-table-wrap" style="margin:0 -5px"><table class="wsite-multicol-table"><tbody class="wsite-multicol-tbody"><tr class="wsite-multicol-tr"><td class="wsite-multicol-col" style="width:30.5%;padding:0 5px"><div><div style="text-align: center;"><a><img src='<?php echo $course["img"] ?>' style="margin-top: 10px; margin-bottom: 10px; margin-left: 0; margin-right: 0; border-width:1px;padding:6px;width:150px; height:150px" alt="Picture" class="galleryImageBorderBlack"></a><div style="display: block; font-size: 90%; margin-top: -10px; margin-bottom: 10px;"></div></div></div>

</td><td class="wsite-multicol-col" style="padding:0 5px"><div class="paragraph editable-text" style=" text-align: left; ">
<h2 style = "padding-top:10px" ><b> <?php echo $course['name'] ?></b></h2>
<a href='<?php echo $course["faculty_page"]?>' style = "padding-top:10px" > <b>Faculty: </b><?php echo $course['faculty'] ?></a>
<p style="padding-top:20px;"><?php echo $course['description'] ?></p>
<p style = "padding-top:10px" > <b>Course page: </b><a href='<?php echo $course["course_page"] ?>' ><?php echo $course['course_page'] ?></a></p>
<br />
</div>

</td></tr></tbody></table></div></div></div></div>

</td><td class="wsite-multicol-col" style="padding:0 5px"><div><div class="wsite-multicol"><div style="padding-right:1.2%"><div class="wsite-multicol-table-wrap" style="margin:0 -5px"><table class="wsite-multicol-table"><tbody class="wsite-multicol-tbody"><tr class="wsite-multicol-tr"><td class="wsite-multicol-col" style="width:49.5%;padding:0 5px"></td><td class="wsite-multicol-col" style="width:49.5%;padding:0 5px"></td></tr></tbody></table></div></div></div></div>

</td></tr></tbody></table></div></div></div></div>
<?php endforeach ?>


                <div class="clear"></div>    
                </div>
                    <div id="footer">
                        
                    </div>
                 <div class="clear"></div>    
                </div>
            </div>        
        </div>            
    </div> 


</body>
</html>