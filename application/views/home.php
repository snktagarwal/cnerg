<div id="navigation">
                <table>
                <tr>
                	<td width="72%">
                    <ul>
                    <li id="active" style="position: relative; ">
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
                    <li id="pg604785984957670984" style="position: relative; ">
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
<div id="content"> <!-- Main content section -->

<table id="content-table" class=".wsite-multicol-table"> <!-- Main content table -->
	<tbody style="vertical-align: top;">
	<tr> <!-- spans the entire area, to be splitted into columns -->
		<td id="left" width="60%">
			<!-- Contents of the left side -- About followed by events and talks -->
			<table id="left-table" class=".wsite-multicol-table" style="vertical-align: top;"> <!-- left side of contents -->
			
				<tr id="about">
					<h4>About CNeRG</h4> <!-- Fill in the details of what CNeRG is all about! -->
					Here goes a description about what CNeRG is and how it functions et al. <br /><br />
				</tr>
				
				<tr id="events"> <!-- Event and talks list -->
					<h4>Events and talks</h4>
					<br />
					<?php foreach($event_list as $event): ?>
					
						<h5><?php echo $event["name"]; ?></h5>
						<div class="paragraph editable-text" style=" text-align: left; ">							
							<strong>Venue: </strong><?php echo $event["where"]; ?> <br />
							<strong>Date:	</strong><?php echo $event["time"].", ".$event["when"] ?> <br /> 
						</div>
						
					<?php endforeach ?> <!-- Event and talks list ends -->
				</tr>
				
			</table> <!-- left side of contents end -->
				
		</td> <!-- left side td ends -->
		
		<td id="right" width="40%"> <!-- right side td -->
			<!-- contents of the right side -- majorly news items -->
			<table id="right-table" class=".wiste-multicol-table">
				<?php foreach($news as $news_item): ?>

					<h3><b> <?php echo $news_item['title']; ?> </b></h3>
					<div class="paragraph editable-text" style=" text-align: left; ">
						<?php echo $news_item['text']; ?>  
					</div>

				<?php endforeach ?>

			</table>
			<a href='<?php echo base_url()."cnerg/index.php/news" ?>'> All news </a>
		</td> <!-- right side td ends -->
		
	</tr>
	</tbody>
</table> <!-- Main content table ends -->
 
 
</div> <!-- End content section -->
