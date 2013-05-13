[#--
 description：
   pageNo      cur page(int)
   pageSize    page size(int)
   toURL       url(string)
   recordCount total record(int)
 usage：
  <#if recordCount??>
    <#import "/pager.ftl" as q>
    <@q.pager pageNo=pageNo pageSize=pageSize recordCount=recordCount q=q toURL="/search"/>
  </#if>
 --]

[#macro pager pageNo pageSize toURL q recordCount]
  [#-- calc total page --]
  [#assign pageCount=((recordCount + pageSize - 1) / pageSize)?int]
	[#if recordCount==0][#return/][/#if]

[#-- calculate page no--]
  [#if (pageNo > pageCount)]
    [#assign pageNo=pageCount]
  [/#if]
  [#if (pageNo < 1)]
    [#assign pageNo=1]
  [/#if]
[#-- page form --]
<div class="pagination">
<form method="post" action="" name="qPagerForm">


<input type="hidden" name="pageNo" value="${pageNo}"/>
<input type="hidden" name="pageSize" value="${pageSize}"/>
<input type="hidden" name="q" value="${q}"/>
[#-- prev page --]
  [#if (pageNo == 1)]
<span class="disabled">&laquo;&nbsp;Prev</span>
  [#else]
<a href="javascript:void(0)" onclick="turnOverPage(${pageNo - 1})">&laquo;&nbsp;Prev</a>
  [/#if]
[#-- if page > 5 display... --]
	[#assign start=1]
	[#if (pageNo > 5)]
    [#assign start=(pageNo - 1)]
<a href="javascript:void(0)" onclick="turnOverPage(1)">1</a>
<a href="javascript:void(0)" onclick="turnOverPage(2)">2</a>&hellip;
	[/#if]
[#-- display page no --]
	[#assign end=(pageNo + 1)]
	[#if (end > pageCount)]
		[#assign end=pageCount]
	[/#if]
  [#list start..end as i]
    [#if (pageNo==i)]
<span class="current">${i}</span>
		[#else]
<a href="javascript:void(0)" onclick="turnOverPage(${i})">${i}</a>      
    [/#if]
  [/#list]
[#-- if page > 5 display...... --]
  [#if (end < pageCount - 2)]
&hellip;  
  [/#if]
  [#if (end < pageCount - 1)]
<a href="javascript:void(0)" onclick="turnOverPage(${pageCount - 1})">${pageCount-1}</a>
  [/#if]
  [#if (end < pageCount)]
<a href="javascript:void(0)" onclick="turnOverPage(${pageCount})">${pageCount}</a>
  [/#if]
[#-- next page--]
  [#if (pageNo == pageCount)]
<span class="disabled">Next&nbsp;&raquo;</span>
  [#else]
<a href="javascript:void(0)" onclick="turnOverPage(${pageNo + 1})">Next&nbsp;&raquo;</a>
  [/#if]
</form>
<script language="javascript">
  function turnOverPage(no){
    var qForm=document.qPagerForm;
    if(no>${pageCount}){no=${pageCount};}
    if(no<1){no=1;}
    qForm.pageNo.value=no;
    qForm.action="${toURL}";
    qForm.submit();
  }
</script>
</div> 
[/#macro]