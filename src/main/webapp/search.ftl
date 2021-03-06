<div class="searchForm">
	  <form class="form-inline" action="search">
	  	<input type="text" placeholder="search keywords" name="q" class="searchInput" value="${q}"/>
	  	<input type="submit" value="Search" class="btn btn-primary"/>
	  </form>
</div>
  <div class="results">
  	[#list results as result]
  	[#if result.title??]
  	<h3 class="title">${result.title}</h3>
    [#else ]
        <h3 class="title">No Title</h3>
  	[/#if]
  	<div class="details">${result.body}</div>
  	[/#list]
  <div>

      [#if totalCount??]
          [#import "/pager.ftl" as page]
              [@page.pager pageNo=pageNo pageSize=pageSize recordCount=totalCount q=q toURL="/search"/]
      [/#if]

