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