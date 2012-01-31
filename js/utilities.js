var ajax = '/ajax/publicBackend.php';
var comment = { };

function submitComment() {
if ($('commentName').value != ''){
  $('errorMessage').innerHTML = '';

  comment.postId = $('commentPostId').value;
  comment.name   = $('commentName').value;
  comment.email  = $('commentEmail').value;
  comment.website = $('commentWebsite').value;
  comment.comment = $('commentComment').value;

  if ($('commentSubmit')) { $('commentSubmit').disabled = true; }

  new Ajax.Request(ajax, {
    parameters: {
        pos: 'postcomment',
        postid: comment.postId,
        name: comment.name,
        email: comment.email,
        website: comment.website,
        comment: comment.comment
    },
    onSuccess:handlerSubmitComment,
    onFailure:errFunc,
    onException:errFunc
  });

}else {  
    $('errorMessage').innerHTML = "You must enter your name. Please try again.";
    new Effect.Highlight('commentName', {startcolor:'#dd0000', endcolor:'#ffffff'});

      }
}

function handlerSubmitComment(t) {

  if (t.responseText.match("%%SUCCESS%%") || t.responseText.match("%%MODERATE%%")) {

    $('commentName').value = '';
    $('commentEmail').value = '';
    $('commentWebsite').value = '';
    $('commentComment').value = '';

    if ($('commentSubmit')) { $('commentSubmit').disabled = false; }

    var commentEl = document.createElement('DIV');
    var rand = Math.floor(Math.random()*10000);
    commentEl.id = "comment"+rand;

    comment.comment = comment.comment.replace(new RegExp("\n", "g"), "<br/>");
    comment.website = "http://"+comment.website.replace(/http:\/\//, "");
    comment.website = comment.website == "http://" ? "" : "<a href='"+comment.website+"'>";
    comment.endTag  = comment.website == "http://" ? "" : "</a>";
    comment.name    = comment.name    == "" ? "Anonymous" : comment.name;
    if (t.responseText.match("%%MODERATE%%")) {
      comment.moderate = "<b>Note: This comment is currently being held for moderation awaiting approval.</b><br/><br/>";
    } else {
      comment.moderate = "";
    }

    commentEl.innerHTML = comment.moderate+"<b>"+comment.website+comment.name+comment.endTag+"</b><br/>"+comment.comment+"<div style='margin: 5px 0; border-bottom: 1px solid #ccc;'> &nbsp; </div><br/>";
    commentEl.style.display = 'none';
    $('lastComment').appendChild(commentEl);
    Effect.Appear(commentEl);

    // Reset fields
    $('commentName').value = '';
    $('commentEmail').value = '';
    $('commentWebsite').value = '';
    $('commentComment').value = '';

  } else {

    if ($('commentSubmit')) { $('commentSubmit').disabled = false; }

    if (t.responseText.match("ERROR:")) {
      $('errorMessage').innerHTML = t.responseText.replace("ERROR:", "");
    } else {
      $('errorMessage').innerHTML = "There was an error submitting your comment. Please try again";
    }
  }

}


function blogCommentDisplayForm(url, wrapperId, commentId) {
    var wrapper = $(wrapperId),
        isOpen = wrapper.retrieve('isReplyFormOpen') || false,
        replyButton = wrapper.previous('.reply-comment').select('span')[0],
        cancelText = /*tl(*/'Cancel Reply'/*)tl*/;

    if (wrapper.retrieve('locked')) return;
    wrapper.store('locked', true);

    var replyText = wrapper.retrieve('replyText');
    if (!replyText) {
        replyText = replyButton.innerHTML;
        wrapper.store('replyText', replyText);
    }

    if (isOpen) {
        replyButton.innerHTML = replyText;
        wrapper.store('isReplyFormOpen', false);
        Effect.SlideUp(wrapper, {
            afterFinish: function() { wrapper.store('locked', false); }    
        });
    } else {
        replyButton.innerHTML = cancelText;
        wrapper.store('isReplyFormOpen', true);
        Effect.SlideDown(wrapper, {
            afterFinish: function() { wrapper.store('locked', false); }    
        });
    }


    var iframe = $$('#'+wrapperId+' iframe')[0];
    if (!iframe) {
        var iframe = '<iframe src="'+url+'" frameborder="0" allowtransparency="true" scrolling="no"></iframe>';
        $$('#'+wrapperId+' > div > div')[0].update(iframe);
    }

    return false;
}

function blogCommentCreateCancelOverlay(wrapperId, commentId) {
    var wrapper = $(wrapperId);
    var buttonId = 'comment_cancel_'+commentId;

    var button = $(buttonId);
    if (button) {
        button.show();
    } else {
        button = new Element('button', {
            id: buttonId,
            'class': 'blogCommentReplyOverlay'
        }).update(/*tl(*/'Cancel'/*)tl*/).observe('click', function() {
            var siblings = wrapper.previousSiblings();
            var replyButton = siblings.findAll(function(sibling) {
                return sibling.hasClassName('reply-comment');
            });
            replyButton[0].onclick();
            return false;
        });
        wrapper.insert(button);
    }
    
    var left = Math.round((wrapper.getWidth()-442)/2);
    var offset = {'top': 372, 'left': left+381};
    button.setStyle({
        position: 'absolute', 
        top: offset.top+'px', 
        left: offset.left+'px'
    });
};

function blogCommentHideCancelOverlay(wrapperId, commentId) {
    var cancel = $('comment_cancel_'+commentId);
    cancel && cancel.hide();
}

function errFunc(t) {

    $('errorMessage').innerHTML = "There was an error submitting your comment. Please try again";

}

var stylePrefix = window.STYLE_PREFIX || 'weebly';
function updateForm(){
    if (window.location.href.match(/posted=(.*)$/)) {
        var posted = $H(decodeURIComponent(window.location.href.match(/posted=(.*)$/)[1].replace(/\+/g, ' ')).evalJSON());
        $$('form').each(
            function(form){
                posted.each(
                    function(pair){
                        if(typeof(pair.value) === 'object'){
                            $H(pair.value).each(function(subpair){
                                form.getInputs().each(function(input){
                                    if(input.name.replace(/_u\d*/, '') == pair.key+'['+subpair.key+']'
                                        || input.name == pair.key+'['+subpair.key+']'){
                                        if(input.type === 'checkbox'){
                                            input.checked = 1;
                                        }
                                        else{
                                            input.value = subpair.value;
                                        }
                                    }
                                });
                            });
                        }
                        else{
                            form.getElements().each(function(input){
                                if(input.name.replace(/_u\d*/, '') == pair.key
                                    || input.name == pair.key){
                                    var realName = input.name;
                                    if(form[realName][0] && form[realName][0].type === 'radio'){
                                        form.getInputs('radio', realName).each(function(radioinput){
                                            if(radioinput.value == pair.value){
                                                radioinput.checked = true;
                                            }
                                        });
                                    }
                                    else{
                                        input.value = pair.value;
                                    }
                                }
                            });
                        }
                    }
                )
            }
        );
    }

    if (window.location.href.match(/form-errors=(.*?)&/) && window.location.href.match(/ucfid%22%3A%22(.*?)%/) ) {
        var errors = window.location.href.match(/form\-errors=(.*?)&/)[1].split(',');
        var ucfid = window.location.href.match(/ucfid%22%3A%22(.*?)%/)[1];
        var form = $('form-'+ucfid);
        errors.each(function(field){
            field = decodeURIComponent(field);
            form.getElements().each(function(input){
                if(input.name.replace(/_u\d*/, '') == field 
                    || input.name.replace(/.*_u/, '_u') == field
                    || input.name.replace(/\[.*\]$/, '') == field){
                    input.addClassName('form-input-error');
                    input.up('.'+stylePrefix+'-form-field').addClassName('form-field-error');
                }
            });
        });
        $(ucfid+'-form-parent').insert({'after':'<div>Please correct the highlighted fields</div>'});
    }

    if (window.location.href.match(/success\=1/) && window.location.href.match(/ucfid\=(.*)/) ) {
        var ucfid = window.location.href.match(/ucfid\=(.*?)&/)[1];
        var form = $('form-'+ucfid);
        var confText = 'Your data was successfully submitted.';
        var textMatch = window.location.href.match(/text=(.*?)&/);
        if(textMatch){
            confText = decodeURIComponent(textMatch[1].replace(/\+/g, ' '));
        }
        form.update('<div>'+confText+'</div>');
    }
}

document.observe('dom:loaded', updateForm);

document.observe('dom:loaded', function(){
    function receiveMessage(message) {
        var response = message.data.evalJSON();
        switch (response.action) 
        {
            case "finished" :
                var ucfid = response.data.ucfid;
                var form = $("form-" + ucfid);
                form.hide();
                if ($(ucfid+'-msg'))
                    $(ucfid+'-msg').update(response.data.message);
                else
                    form.insert({'after':'<div id="'+ucfid+'-msg">'+response.data.message+'</div>'});
                new Effect.ScrollTo($(ucfid+'-msg'),{ queue:{scope: 'loading',location:'end'} });
                new Effect.Highlight($(ucfid+'-msg'),{ duration:2, queue:{scope: 'loading',location:'end'} });
                return;
            case "redirect" :
                window.location = response.data.location;
                return;
            case "error" :
                var errors = response.data['error-fields'];
                var ucfid = response.data.ucfid;
                var form = $("form-" + ucfid);
                form.getElements().each(function(input){
                    if(input.hasClassName('form-input-error')) {
                        input.removeClassName('form-input-error');
                        input.up('.'+stylePrefix+'-form-field').removeClassName('form-field-error');
                    } 
                });
                errors.each(function(field){
                    form.getElements().each(function(input){
                        if(input.name.replace(/_u\d*/, '') == field 
                            || input.name.replace(/.*_u/, '_u') == field
                            || input.name.replace(/\[.*\]$/, '') == field){
                            input.addClassName('form-input-error');
                            input.up('.'+stylePrefix+'-form-field').addClassName('form-field-error');
                        } 
                    });
                });
                if ($(ucfid+'-msg'))
                    $(ucfid+'-msg').update(response.data.message);
                else
                    form.insert({'after':'<div id="'+ucfid+'-msg">'+response.data.message+'</div>'});
                return;
        }
    }

    var listening = false;
    $$('form').each(
        function(form) {
            if (form.action.match(/formSubmit\.php$/))
            {
                form.action = form.action.replace(/(.*)\/formSubmit\.php$/,window.location.protocol + "//" + window.location.host +"/ajax/apps/formSubmitAjax.php");
                form.acceptCharset = "UTF-8";
                var iframe, 
                    name = form.id + "-target";
                try {
                    iframe = document.createElement('<iframe name="' + name + '">');
                } catch (ex) {
                    iframe = document.createElement('iframe');
                    iframe.name = name;
                }

                iframe.style.display = "none";
                iframe.id = name;
                form.insert({after:iframe});
                form.target = iframe.id;
                
                if (!listening)
                {
                    if (window.postMessage) 
                    {
                        listening = false;
                        if (window.addEventListener)
                            window.addEventListener("message", receiveMessage, false);
                        else if (window.attachEvent)
                            window.attachEvent("onmessage", receiveMessage);
                    } 
                    else 
                    {
                        function iframeOnLoad() {
                            try {
                                var location = (iframe.contentDocument || iframe.contentWindow.document).location.href;
                                var data = (iframe.contentDocument || iframe.contentWindow.document).body.firstChild.nodeValue;
                                if (location != "about:blank")
                                {
                                    receiveMessage({data: data, source:iframe.contentWindow});
                                }
                            } catch(e) {
                                
                            }
                        }
                        if (iframe.addEventListener)
                            iframe.addEventListener("load", iframeOnLoad, false);
                        else if (iframe.attachEvent)
                            iframe.attachEvent("onload", iframeOnLoad);
                        else
                            iframe.observe("load", iframeOnLoad);
                    }
                }
            }
        }
    );
});

function showFieldInstructions( msg, pointTo )
{
    removeFieldInstructions();
    $(pointTo).identify();
    var image = false;
    var el = new Element( 'div', { 'class':'instructions-container', 'id':pointTo.id+'-instructions' } ).update( msg );
    currentVisibleError = el.identify();
    el.observe( 'click', function(e){ el.hide().remove() } );
    $(document.body).insert( {'bottom':el} );
    var dimensions = el.getDimensions();

    var target = $(pointTo);
    var offset = target.cumulativeOffset();
    var targetDimensions = target.getDimensions();
    var top = (offset.top + targetDimensions.height/2 - dimensions.height/2) + 'px';
    var left = ( offset.left + targetDimensions.width + 20 ) + 'px';

    el.setStyle( {top: top, left: left} );
    //set arrow position
    var imagetop  = Math.floor( dimensions.height / 2 ) - 10;
    var imageleft = '-13';
    el.insert( {'bottom':'<img src="http://www.weebly.com/images/error_arrow_left.gif" style="position: absolute; left:'+imageleft+'px; top: '+imagetop+'px;" />'} );
}

function handlerRemoveFieldInstructions(event){
    var el = Event.element(event);
    if(!el.hasClassName(stylePrefix+'-form-field') && !el.up('.'+stylePrefix+'-form-field')){
        document.stopObserving('mousemove', handlerRemoveFieldInstructions);
        removeFieldInstructions();
    }
}

function removeFieldInstructions(){
    $$('.instructions-container').each(function(el){
        var input_id = el.id.replace('-instructions', '');
        if(!currentlyFocusedFormElement || $(input_id).up('.'+stylePrefix+'-form-field').identify() != currentlyFocusedFormElement){
            el.remove();
        }
    })
}

function fieldInstructionsHandler(){
    $$('.'+stylePrefix+'-form-instructions').each(function(el){
        if(!el.innerHTML.empty()){
            var pointTo = $(el.id.replace('instructions', 'input'));
            //select inputs
            if(!pointTo){
                pointTo = el.up('.'+stylePrefix+'-form-field').down('.form-select');
            }
            //radio/checkbox inputs
            if(!pointTo){
                pointTo = el.up('.'+stylePrefix+'-form-field').down('.'+stylePrefix+'-form-label');
            }
            var container = pointTo.up('.'+stylePrefix+'-form-field');
            if(pointTo.up('.'+stylePrefix+'-form-input-container') && pointTo.up('.'+stylePrefix+'-form-input-container').hasClassName(stylePrefix+'-form-left')){
                pointTo = pointTo.up('.'+stylePrefix+'-form-input-container').next('.'+stylePrefix+'-form-right');
            }
            container.observe('mouseover', function(event){
                if(this.hasClassName(stylePrefix+'-form-field')){
                    if(!container.down('.instructions-container')){
                        showFieldInstructions(el.innerHTML, pointTo);
                    }
                    document.observe('mousemove', handlerRemoveFieldInstructions);
                }
            });
        }
    })
}

function setWeeblyApproved(){
    $$("input[name=" + stylePrefix + '_approved]').each(function(field){
        field.value = 'weebly';
    });
    
    document.stopObserving('click', setWeeblyApproved);
    document.stopObserving('keydown', setWeeblyApproved);
}

document.observe('click', setWeeblyApproved);
document.observe('keydown', setWeeblyApproved);

document.observe('dom:loaded', fieldInstructionsHandler);
currentlyFocusedFormElement = null;
document.observe('click', function(event){
    var el = Event.element(event);
    var up = el.up('.'+stylePrefix+'-form-field');
    if(el.hasClassName(stylePrefix+'-form-field')){
        up = el;
    }
    if(up){
        currentlyFocusedFormElement = up.identify();
    }
    else{
        currentlyFocusedFormElement = null;
    }
    removeFieldInstructions();
});


// console.log wont ever die cause it doesn't exist
// TODO: put this in the weebly editor js
if (!window.console) {
	window.console = {};
}
if (!window.console.log) {
	window.console.log = function(){};
}
