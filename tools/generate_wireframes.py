from PIL import Image, ImageDraw, ImageFont
import os


OUTPUT_DIR = "/workspace/design/wireframes"


def ensure_output_dir() -> None:
    os.makedirs(OUTPUT_DIR, exist_ok=True)


def make_canvas(width: int, height: int, bg=(11, 11, 13)):
    return Image.new("RGB", (width, height), bg)


def draw_bar(draw: ImageDraw.ImageDraw, xy, fill=(20, 20, 24)):
    draw.rectangle(xy, fill=fill)


def draw_text(draw: ImageDraw.ImageDraw, xy, text: str, size: int = 32, fill=(255, 255, 255)):
    try:
        font = ImageFont.truetype("DejaVuSans.ttf", size)
    except Exception:
        font = ImageFont.load_default()
    draw.text(xy, text, font=font, fill=fill)


def draw_card(draw: ImageDraw.ImageDraw, xy, title: str = "Card", fill=(26, 26, 31)):
    draw.rectangle(xy, fill=fill)
    x0, y0, x1, y1 = xy
    draw_text(draw, (x0 + 16, y0 + 12), title, size=24)


def phone_home():
    # 1080x2400 portrait
    img = make_canvas(1080, 2400)
    d = ImageDraw.Draw(img)
    # Status + App bar
    draw_bar(d, (0, 0, 1080, 144))
    draw_text(d, (24, 48), "Home · Live & News")
    # Search bar
    draw_card(d, (24, 168, 1056, 264), "Search…")
    # Live carousel
    draw_text(d, (24, 312), "Live & Starting Soon")
    draw_card(d, (24, 360, 504, 600), "Live: Match 1")
    draw_card(d, (552, 360, 1056, 600), "Soon: Match 2")
    # News feed cards
    y = 648
    for i in range(4):
        draw_card(d, (24, y, 1056, y + 240), f"News item {i+1}")
        y += 264
    # Bottom nav
    draw_bar(d, (0, 2256, 1080, 2400))
    draw_text(d, (120, 2300), "Home   Explore   Live   Profile", size=28, fill=(184, 184, 190))
    img.save(os.path.join(OUTPUT_DIR, "phone_home.png"))


def tv_home():
    # 1920x1080 landscape
    img = make_canvas(1920, 1080)
    d = ImageDraw.Draw(img)
    # App bar
    draw_bar(d, (0, 0, 1920, 96))
    draw_text(d, (24, 28), "Home · Live Now · Starting Soon")
    # Left rail
    draw_bar(d, (0, 96, 240, 1080), fill=(20, 20, 24))
    draw_text(d, (24, 140), "Home\nExplore\nSports\nSettings", size=28)
    # Carousels
    draw_text(d, (264, 120), "Live Now")
    draw_card(d, (264, 168, 696, 432), "LIVE Match 1")
    draw_card(d, (720, 168, 1152, 432), "LIVE Match 2")
    draw_card(d, (1176, 168, 1608, 432), "LIVE Match 3")
    draw_text(d, (264, 480), "Starting Soon")
    draw_card(d, (264, 528, 696, 792), "Soon 1")
    draw_card(d, (720, 528, 1152, 792), "Soon 2")
    draw_card(d, (1176, 528, 1608, 792), "Soon 3")
    img.save(os.path.join(OUTPUT_DIR, "tv_home.png"))


def match_detail_phone():
    img = make_canvas(1080, 2400)
    d = ImageDraw.Draw(img)
    draw_bar(d, (0, 0, 1080, 144))
    draw_text(d, (24, 48), "Match Detail")
    draw_card(d, (24, 168, 1056, 504), "Team A vs Team B · 19:00")
    draw_card(d, (24, 528, 1056, 672), "Subscribe (5m alert)")
    draw_card(d, (24, 696, 1056, 1056), "Stats / Lineups")
    draw_card(d, (24, 1080, 1056, 1680), "Related News")
    img.save(os.path.join(OUTPUT_DIR, "match_detail_phone.png"))


def live_player_tv():
    img = make_canvas(1920, 1080)
    d = ImageDraw.Draw(img)
    draw_card(d, (0, 0, 1920, 1080), "Video")
    draw_bar(d, (0, 960, 1920, 1080), fill=(0, 0, 0))
    draw_text(d, (24, 972), "Play  |  Pause  |  Live  |  Quality  |  Audio", size=28)
    img.save(os.path.join(OUTPUT_DIR, "live_player_tv.png"))


def news_detail_phone():
    img = make_canvas(1080, 2400)
    d = ImageDraw.Draw(img)
    draw_bar(d, (0, 0, 1080, 144))
    draw_text(d, (24, 48), "News Detail · uz/ru/en")
    draw_card(d, (24, 168, 1056, 600), "Hero Image")
    draw_card(d, (24, 624, 1056, 1200), "Article body…")
    draw_card(d, (24, 1224, 1056, 1624), "Related items")
    img.save(os.path.join(OUTPUT_DIR, "news_detail_phone.png"))


def settings_phone():
    img = make_canvas(1080, 2400)
    d = ImageDraw.Draw(img)
    draw_bar(d, (0, 0, 1080, 144))
    draw_text(d, (24, 48), "Settings")
    draw_card(d, (24, 168, 1056, 312), "Language: uz | ru | en")
    draw_card(d, (24, 336, 1056, 480), "Favorites & Notifications")
    draw_card(d, (24, 504, 1056, 648), "Default reminders: 30m, 5m")
    draw_card(d, (24, 672, 1056, 816), "Linked Accounts: Phone, Google, GitHub")
    img.save(os.path.join(OUTPUT_DIR, "settings_phone.png"))


def main():
    ensure_output_dir()
    phone_home()
    tv_home()
    match_detail_phone()
    live_player_tv()
    news_detail_phone()
    settings_phone()
    print(f"Saved wireframes to: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()

