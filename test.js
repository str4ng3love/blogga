<div class="options-item">
    <div>
        <h2>My Posts</h2>
      
        <% if(posts){ %>
            <% posts.forEach(post=>{ %>
                <div class="item"><span><%= post %></span> </div>
        <%    }) %>
        <% }  if(posts ===""){ %>
            <h2>test</h2>
        <% } %>

    </div>
</div>