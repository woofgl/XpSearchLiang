
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
            </div>
        </div>
    </form>

    <script type="text/javascript">
        $("#indexPage").on("click",  "button.import", function(event) {
            $.get("import", function(data){
                console.log("import success");
            })
            return false;
        });
    </script>

</section>