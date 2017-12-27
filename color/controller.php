<?php require $_SERVER['DOCUMENT_ROOT'].'/template/color/db.php';
$id = 0;
foreach ($dbcolors as $dbcolor) {
if (preg_match("/Fito/", $dbcolor[0]) == 0) {
?>
<div class="btnimg"><img data-svp="<?php echo $dbcolor[2]; ?>" data-power="<?php echo $dbcolor[3]; ?>" data-img2="<?php echo $dbcolor[5][1]; ?>" data-link="<?php echo $dbcolor[7]; ?>" class="swap-img" src="/img/search-close.png" data-src="<?php echo '/img/lamps/cat0/'.$dbcolor[5][0]; ?>" alt="<?php echo $dbcolor[0]; ?>" data-id="<?php echo $id; ?>">
	<span class="colornavspan"><?php echo $dbcolor[0]; ?></span>
	</div>
<?php
}
$id++; } ?>
