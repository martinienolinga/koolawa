<?php

/* @Framework/Form/form_end.html.php */
class __TwigTemplate_899334d365d21dc1e3dbbb407dd991252491734f165681c16771acc9e328b5b8 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_93f0e3d144a6f88cb0835682506717ecd9db65dba11971ed41018b4603a1b903 = $this->env->getExtension("native_profiler");
        $__internal_93f0e3d144a6f88cb0835682506717ecd9db65dba11971ed41018b4603a1b903->enter($__internal_93f0e3d144a6f88cb0835682506717ecd9db65dba11971ed41018b4603a1b903_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_end.html.php"));

        // line 1
        echo "<?php if (!isset(\$render_rest) || \$render_rest): ?>
<?php echo \$view['form']->rest(\$form) ?>
<?php endif ?>
</form>
";
        
        $__internal_93f0e3d144a6f88cb0835682506717ecd9db65dba11971ed41018b4603a1b903->leave($__internal_93f0e3d144a6f88cb0835682506717ecd9db65dba11971ed41018b4603a1b903_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_end.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php if (!isset($render_rest) || $render_rest): ?>*/
/* <?php echo $view['form']->rest($form) ?>*/
/* <?php endif ?>*/
/* </form>*/
/* */
