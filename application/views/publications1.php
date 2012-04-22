
<div id="navigation">
                <table>
                <tr>
                	<td width="72%">
                    <ul>
                    <li style="position: relative; ">
	                    	<a href="home" style="position: relative; ">Home</a>
                    </li>
                    <li id="pg873600280878711087" style="position: relative; ">
                    	<a href="about" style="position: relative; ">About</a>
                    </li>
                    <li id="pg849208609319064705" style="position: relative; ">
                    	<a href="projects" style="position: relative; ">Projects</a>
                    </li>
                    <li id="active" style="position: relative; ">
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
                <div id="content">
                    <div id='wsite-content' class='wsite-not-footer'>
<div class='wsite-not-footer'>

<?php foreach($pub_list as $pub): ?>
<h2  style=" text-align: left; padding-top: 20px;"><?php echo $pub[0]['year'] ?></h2>
<div ><div style="height: 20px; overflow: hidden; width: 100%;"></div>
<hr class="styled-hr" style="width:100%;"></hr>
<div style="height: 20px; overflow: hidden; width: 100%;"></div></div>

<?php foreach($pub as $pub_e): ?>

<div  class="paragraph editable-text" style=" text-align: left; ">

<ul style="margin-top: 5px !important; margin-right: 0px !important; margin-bottom: 5px !important; margin-left: 0px !important; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; list-style-type: disc !important; list-style-position: outside !important; list-style-image: initial !important; overflow-x: hidden; overflow-y: hidden; ">
<li>
<strong><?php echo $pub_e['authors'] ?></strong>
</li>
</ul> <i><?php echo $pub_e['name'] ?></i>

<br /> <?php echo $pub_e['proceeding'] ?>

<?php if($pub_e['proc_url']) echo '<a href='.$pub_e['proc_url'].'> [CONF| </a>';
else echo "["?>
<a href='<?php echo $pub_e["url"] ?>' title="" style="color: rgb(102, 102, 102) !important; text-decoration: none; ">PDF]</a><br />

<?php endforeach ?>

<?php endforeach ?>
</div>

</div>
</div>

                <div class="clear"></div>    
                </div>
                    <div id="footer">
                        
<script type='text/javascript'>
<!--

if (document.cookie.match(/(^|;)\s*is_mobile=1/)) {
	document.write(
		"&nbsp;&nbsp;&nbsp;&nbsp;" +
		"<a href='?mobile'>Mobile Site</a>"
	);
}

//-->
</script>

                    </div>
                 <div class="clear"></div>    
                </div>
            </div>        
        </div>            
    </div> 


<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-7870337-1']);
  _gaq.push(['_setDomainName', 'none']);
  _gaq.push(['_setAllowLinker', true]);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

<!-- Start Quantcast tag -->
<script type="text/javascript">
  _qoptions={
    qacct:"p-0dYLvhSGGqUWo"
  };
</script>
<script type="text/javascript" src="http://edge.quantserve.com/quant.js"></script>
<noscript>
<img src="http://pixel.quantserve.com/pixel/p-0dYLvhSGGqUWo.gif" style="display: none;" border="0" height="1" width="1" alt="Quantcast"/>
</noscript>
<!-- End Quantcast tag -->

<script>

  (function() {
    try {
      $$('div.blog-social div.fb-like').each(function(div) {
        div.className = 'blog-social-item blog-fb-like';
      });
    }
    catch (ex) {}
  })();

  try {
    $$('#commentArea iframe').each(function(iframe) {
      iframe.style.minHeight = '410px';
    });
  }
  catch (ex) {}

</script>

</body>
</html>