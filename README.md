# Django Tutorials

Django is a Python based web framework used to create websites or web servers.
It is modular so you can pick and choose what you want for your project.

One element of Django is templates (templating engine). The templating system is relatively quite straightforward as in you inject in text and it outputs the result. The template engine within the Django context - inject stuff like <h1>{ } title {} </h1> will become (this is where the templating engine does its work)<h1> Actual Title </h1>
Text in, text out ^ that's step 1, where you put stuff in HTML and it goes back to your client.

The second element of Django is ORM (Object Relational Mapper). The Model Layer. 
There needs to be a Python class which we provide and it outputs an SQL table. 
Django will index it, among other things - we don't necessarily have to write the SQL code.

The third element of Django is Rooting. It takes an URL and actives a Python function, a callable.
User types in the URL, gets sent to the server, after some point it activates a Python code of some sort. It is the decoder.

The final element of Django is Views. Pure Python, so it's the logic. It always accepts requests and always sends out a response. The response or exception is usually to render the template with some data - but it could be something else.

In URL Patterns, use path(''....) at the end.

# Django Terminology
