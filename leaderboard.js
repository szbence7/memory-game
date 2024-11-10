function getRankDisplay(index) {
    switch(index) {
        case 0: return '🥇';
        case 1: return '🥈';
        case 2: return '🥉';
        default: return `${index + 1}`;
    }
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function updateLeaderboard() {
    fetch('get_leaderboard.php')
        .then(response => response.json())
        .then(leaderboard => {
            const tableBody = document.querySelector('.leaderboard-table tbody');
            tableBody.innerHTML = '';

            leaderboard.forEach((entry, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${getRankDisplay(index)}</td>
                    <td>${escapeHtml(entry.name)}</td>
                    <td>${parseInt(entry.score)}</td>
                    <td>${parseInt(entry.moves)}</td>
                    <td>${formatTime(parseInt(entry.time))}</td>
                    <td>${new Date(entry.date).toLocaleString()}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            document.querySelector('.leaderboard-content').innerHTML = 
                '<p class="error">Failed to load leaderboard. Please try again later.</p>';
        });
}

// Frissítés amikor betöltődik az oldal
document.addEventListener('DOMContentLoaded', updateLeaderboard);

// Frissítés 30 másodpercenként
setInterval(updateLeaderboard, 30000);
