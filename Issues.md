#Port existing Java framework?

I am looking to port 
[https://github.com/dimwight/Facets] 
to TS and your transpiler seems potentially 
very useful. 

However I am having difficulty in using it at even
a basic level.

This code transpiles:
```
public interface Notifiable {
  void notify(String notice);
}
```
But this doesn't:
```
import facets.core.superficial.Notice;
public interface Notifiable {
  void notify(Notice notice);
}
``` 
The import is on the path and 
the compiled class appears in `` /target/classes ``.

What am I doing wrong?