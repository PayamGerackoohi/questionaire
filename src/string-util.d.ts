export function replace(text: string, regex: RegExp, map: { [x: string]: string; }): string;

export let regex: {
	'//': RegExp;
	'/*': RegExp;
	'<!--': RegExp;
	'/* | <!--': RegExp;
	'// | /*': RegExp;
	'all': RegExp;
}
