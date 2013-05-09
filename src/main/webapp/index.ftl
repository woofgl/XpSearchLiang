
<section id="indexPage" class="content">
    <h2>PostgreSql Full Text Search Demo</h2>

    <form class="form-horizontal searchForm" action="search" >
        <div class="control-group">
            <div class="controls">
                <input type="text" name="q" placeholder="search keywords">
            </div>
        </div>
        <div class="control-group">
            <div class="controls">
                <button type="submit" class="btn">Search</button>
                <button class="btn import">Import</button>
                <label class="checkbox inline">
                    <input type="checkbox" value="includeComments">Comments
                </label>
            </div>
        </div>
    </form>

    <script type="text/javascript">
        $("#indexPage").on("click",  "button.import", function(event) {
            var includeComments = $("#indexPage input[type='checkbox']").attr("checked");
            if(includeComments) {
                includeComments = true;
            }else{
                includeComments = false;
            }
             console.log(includeComments)
            $.get("import", {includeComments:includeComments}, function(data){
                console.log("import success");
            })
            return false;
        });
    </script>

</section>