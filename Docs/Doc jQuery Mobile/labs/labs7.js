//When the "add contact" page is created...
$('#addContactPage').live('pagecreate',function()
{
	//For each button...
	$(this).find('button').each(function()
	{
		//We listen its click event
		$(this).click(function()
		{
			var val=$('#newContactPhone').val();
			
			//If it's the "back" button
			if($(this).attr('data-icon'))
			{
				//We delete the last character of the phone number
				$('#newContactPhone').val(val.substr(0,val.length-1));
			}
			//If it's a "normal" button
			else
			{
				//We add its contents to the phone number
				$('#newContactPhone').val(val+$(this).text());
			}
			
			//And we prevent the submission!
			return false;
		});
	}).end().find('form').submit(function()
	{
		var name = $('#newContactName').val(),
		tel = $('#newContactPhone').val();
		
		if(name && tel)
		{
			$('#newContactName').val('');
			$('#newContactPhone').val('');
			storeContact(name,tel);
		}
	});
});

//When the main page is created.
$('#mainPage').live('pagecreate',function()
{
	//Just after the page is shown
	$(this).bind('pageshow',function()
	{
		var contacts=getContacts(),
		list='';
		for(var name in contacts)
		{
			list+='<li><b>'+name+'</b> : '+contacts[name]+'</li>';
		}
		/*  
			================================
			==  Modify this code in order ==
			==   to display a list view   ==
			================================
		*/
		$(this).find('#contacts_list').html(list);
	});
	
	/*  
		=============================================
		== Attach clicks events on delete links in ==
		==  order to delete contacts from the list ==
		=============================================
	*/
	/*
		TIPS: use deleteContact(name); to internally delete
		the contact having the corresponding name!
		But don't forget to update the displaying ;)
	*/
});

/*	
	===============================================
	==       These below functions are here      ==
	== to store the contacts. Don't modify them! ==
	===============================================
*/
function getContacts()
{
	var contacts=window.localStorage.getItem('contacts');
	
	if(!contacts)
	{
		return {};
	}
	return JSON.parse(contacts);
}

function storeContact(name,phone)
{
	var contacts=getContacts();
	contacts[name]=phone;
	window.localStorage.setItem('contacts',JSON.stringify(contacts));
}

function deleteContact(name)
{
	var contacts=getContacts();
	delete contacts[name];
	window.localStorage.setItem('contacts',JSON.stringify(contacts));
}