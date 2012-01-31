 <div id="content">
                    <div id='wsite-content' class='wsite-not-footer'>
<div class='wsite-not-footer'>
<h2  style=" text-align: left; "><font color="#000000">People</font></h2>

<div ><div style="height: 20px; overflow: hidden; width: 100%;"></div>
<hr class="styled-hr" style="width:100%;"></hr>
<div style="height: 20px; overflow: hidden; width: 100%;"></div></div>



<h2  style=" text-align: left; "><font color="#000000">Professors</font></h2>



<?php foreach($people['PROF'] as $prof): ?>

<div><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:59.5%;padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'><div ><div style="text-align: center;"><a><img src='<?php echo $prof["img"]?>' style="margin-top: 10px; margin-bottom: 10px; margin-left: 0; margin-right: 0; border-width:1px;padding:6px;width:100px; height:100px" alt="Picture" class="galleryImageBorderBlack" /></a><div style="display: block; font-size: 90%; margin-top: -10px; margin-bottom: 10px;"></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div  class="paragraph editable-text" style=" text-align: left; "><font color="#000000" size="3"><strong style="">
<br /><a href='<?php echo $prof["url"] ?>'><?php echo $prof['name'] ?></a></strong><br />
<br /><?php echo $prof['department'] ?>
<br /><?php echo $prof['college'] ?>

</font><br /><br /></div>

</td></tr></tbody></table></div></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td></tr></tbody></table></div></div></div></div>

</td></tr></tbody></table></div></div></div></div>

<?php endforeach ?>

<h2  style=" text-align: left; "><font color="#000000">PhD</font></h2>

<?php foreach($people['PHD'] as $prof): ?>

<div><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:59.5%;padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'><div ><div style="text-align: center;"><a><img src='<?php echo $prof["img"]?>' style="margin-top: 10px; margin-bottom: 10px; margin-left: 0; margin-right: 0; border-width:1px;padding:6px;width:100px; height:100px" alt="Picture" class="galleryImageBorderBlack" /></a><div style="display: block; font-size: 90%; margin-top: -10px; margin-bottom: 10px;"></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div  class="paragraph editable-text" style=" text-align: left; "><font color="#000000" size="3"><strong style="">
<br /><a href='<?php echo $prof["url"] ?>'><?php echo $prof['name'] ?></a></strong><br />
<br /><?php echo $prof['department'] ?>
<br /><?php echo $prof['college'] ?>
</font><br /><br /></div>

</td></tr></tbody></table></div></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td></tr></tbody></table></div></div></div></div>

</td></tr></tbody></table></div></div></div></div>

<?php endforeach ?>

<h2  style=" text-align: left; "><font color="#000000">Master's</font></h2>

<?php foreach($people['MTECH'] as $prof): ?>

<div><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:59.5%;padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'><div ><div style="text-align: center;"><a><img src='<?php echo $prof["img"]?>' style="margin-top: 10px; margin-bottom: 10px; margin-left: 0; margin-right: 0; border-width:1px;padding:6px;width:100px; height:100px" alt="Picture" class="galleryImageBorderBlack" /></a><div style="display: block; font-size: 90%; margin-top: -10px; margin-bottom: 10px;"></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div  class="paragraph editable-text" style=" text-align: left; "><font color="#000000" size="3"><strong style="">
<br /><a href='<?php echo $prof["url"] ?>'><?php echo $prof['name'] ?></a></strong><br />
<br /><?php echo $prof['department'] ?>
<br /><?php echo $prof['college'] ?>
</font><br /><br /></div>

</td></tr></tbody></table></div></div></div></div>

</td><td class='wsite-multicol-col' style='padding:0 5px'><div ><div class="wsite-multicol"><div style='padding-right:1.2%'><div class='wsite-multicol-table-wrap' style='margin:0 -5px'><table class='wsite-multicol-table'><tbody class='wsite-multicol-tbody'><tr class='wsite-multicol-tr'><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td><td class='wsite-multicol-col' style='width:49.5%;padding:0 5px'></td></tr></tbody></table></div></div></div></div>

</td></tr></tbody></table></div></div></div></div>

<?php endforeach ?>



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